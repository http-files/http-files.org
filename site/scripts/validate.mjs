// Cross-checks the data files against each other and against tag usage in
// .mdoc pages. Complements the build: ClientCard, SupportTable, Supported,
// and SpecRef throw on unknown ids at build time; this script catches the
// rest (data integrity, syntax-example keys) with clearer messages, before
// a build ever runs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const clients = yaml.load(read('src/data/clients.yaml')).clients;
const categories = yaml.load(read('src/data/features.yaml')).categories;
const examples = yaml.load(read('src/data/syntax-examples.yaml')).examples;

const errors = [];
const VALID_VALUES = [true, false, 'partial'];

// --- features.yaml integrity ---
for (const [catId, cat] of Object.entries(categories)) {
	if (!Array.isArray(cat.clients) || cat.clients.length === 0) {
		errors.push(`features.yaml: category "${catId}" has no clients list`);
		continue;
	}
	for (const id of cat.clients) {
		if (!clients[id]) errors.push(`features.yaml: category "${catId}" lists unknown client "${id}"`);
	}
	for (const feature of cat.features ?? []) {
		const support = feature.support ?? {};
		for (const id of cat.clients) {
			if (!(id in support)) {
				errors.push(`features.yaml: ${catId}/${feature.id} has no value for "${id}"`);
			}
		}
		for (const [id, value] of Object.entries(support)) {
			if (!cat.clients.includes(id)) {
				errors.push(`features.yaml: ${catId}/${feature.id} has a value for "${id}", which is not in the category's clients list`);
			}
			if (!VALID_VALUES.includes(value)) {
				errors.push(`features.yaml: ${catId}/${feature.id} has invalid value ${JSON.stringify(value)} for "${id}" (use true, false, or partial)`);
			}
		}
	}
}

// --- tag usage in .mdoc pages ---
const mdocFiles = [];
(function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(p);
		else if (entry.name.endsWith('.mdoc')) mdocFiles.push(p);
	}
})(path.join(root, 'src/content/docs'));

for (const file of mdocFiles) {
	const src = fs.readFileSync(file, 'utf8');
	const rel = path.relative(root, file);
	for (const m of src.matchAll(/\{%\s*supported\s+clients="([^"]+)"/g)) {
		for (const id of m[1].split(',').map((s) => s.trim())) {
			if (!clients[id]) errors.push(`${rel}: {% supported %} references unknown client "${id}"`);
		}
	}
	for (const m of src.matchAll(/\{%\s*client-card\s+id="([^"]+)"/g)) {
		if (!clients[m[1]]) errors.push(`${rel}: {% client-card %} references unknown client "${m[1]}"`);
	}
	for (const m of src.matchAll(/\{%\s*support-table\s+category="([^"]+)"/g)) {
		if (!categories[m[1]]) errors.push(`${rel}: {% support-table %} references unknown category "${m[1]}"`);
	}
	for (const m of src.matchAll(/\{%\s*syntax-example\s+feature="([^"]+)"/g)) {
		if (!examples[m[1]]) errors.push(`${rel}: {% syntax-example %} references unknown feature "${m[1]}"`);
	}
}

if (errors.length) {
	console.error(`✗ ${errors.length} validation error(s):`);
	for (const e of errors) console.error(`  - ${e}`);
	process.exit(1);
}
console.log(
	`✓ data validated: ${Object.keys(clients).length} clients, ${Object.keys(categories).length} categories, ${mdocFiles.length} pages`
);
