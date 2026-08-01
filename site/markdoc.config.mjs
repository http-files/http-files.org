import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';

export default defineMarkdocConfig({
	extends: [starlightMarkdoc()],
	tags: {
		// Custom DSL tags for http-files.org

		// Renders a feature support table from YAML data
		// Usage: {% support-table category="variables" /%}
		'support-table': {
			render: component('./src/components/SupportTable.astro'),
			selfClosing: true,
			attributes: {
				category: { type: String, required: true },
			},
		},

		// Renders a single feature's support row inline
		// Usage: {% supported clients="jetbrains,httpyac,kulala" /%}
		'supported': {
			render: component('./src/components/Supported.astro'),
			selfClosing: true,
			attributes: {
				clients: { type: String, required: true },
			},
		},

		// Renders a syntax example with optional per-client variants
		// Usage: {% syntax-example feature="lazy-variables" /%}
		'syntax-example': {
			render: component('./src/components/SyntaxExample.astro'),
			selfClosing: true,
			attributes: {
				feature: { type: String, required: true },
			},
		},

		// Client info card linking to external docs
		// Usage: {% client-card id="jetbrains" /%}
		'client-card': {
			render: component('./src/components/ClientCard.astro'),
			selfClosing: true,
			attributes: {
				id: { type: String, required: true },
			},
		},

		// Grid layout for client cards
		// Usage: {% client-grid %} ... {% /client-grid %}
		'client-grid': {
			render: component('./src/components/ClientGrid.astro'),
		},

		// Interoperability callout — highlights universal vs client-specific
		// Usage: {% interop level="universal" %} ... {% /interop %}
		'interop': {
			render: component('./src/components/Interop.astro'),
			attributes: {
				level: {
					type: String,
					required: true,
					matches: ['universal', 'widespread', 'limited', 'unique'],
				},
			},
		},

		// Spec page cross-reference
		// Usage: {% spec-ref page="variables" /%}
		'spec-ref': {
			render: component('./src/components/SpecRef.astro'),
			selfClosing: true,
			attributes: {
				page: { type: String, required: true },
			},
		},

		// HTTP syntax highlighted code block (custom language support)
		'http': {
			render: component('./src/components/HttpCodeBlock.astro'),
			attributes: {
				title: { type: String },
			},
		},
	},
});
