// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
	site: 'https://http-files.org',
	redirects: {
		'/spec/file-includes/': '/spec/file-operations/',
		'/spec/imports/': '/spec/file-operations/',
		'/spec/response-saving/': '/spec/file-operations/',
		'/spec/multipart/': '/spec/file-operations/',
		'/compare/portability/': '/guides/portability/',
	},
	integrations: [
		markdoc(),
		starlight({
			title: '.http files',
			description: 'The home of the .http file format — specification, tools, and cross-client compatibility reference.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/http-files/http-files.org' },
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#00d4ff' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://http-files.org/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://http-files.org/og-image.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'What are .http files?', slug: 'guides/introduction' },
						{ label: 'Your First .http File', slug: 'guides/quickstart' },
						{ label: 'Choose a Client', slug: 'guides/choose-a-client' },
						{ label: 'Writing Portable Files', slug: 'guides/portability' },
					],
				},
				{
					label: 'Specification',
					items: [
						{
							label: 'Fundamentals',
							items: [
								{ label: 'File Basics', slug: 'spec/basics' },
								{ label: 'Requests', slug: 'spec/requests' },
								{ label: 'Separators & Comments', slug: 'spec/separators' },
							],
						},
						{
							label: 'Variables',
							items: [
								{ label: 'Variables', slug: 'spec/variables' },
								{ label: 'Environments', slug: 'spec/environments' },
								{ label: 'Dynamic Variables', slug: 'spec/dynamic-variables' },
							],
						},
						{
							label: 'Request Features',
							items: [
								{ label: 'Metadata & Annotations', slug: 'spec/metadata' },
								{ label: 'Authentication', slug: 'spec/auth' },
								{ label: 'File Operations', slug: 'spec/file-operations' },
								{ label: 'GraphQL', slug: 'spec/graphql' },
							],
						},
						{
							label: 'Scripting',
							items: [
								{ label: 'Response Handlers', slug: 'spec/response-handlers' },
								{ label: 'Pre-Request Scripts', slug: 'spec/pre-request-scripts' },
							],
						},
						{
							label: 'Transport',
							items: [
								{ label: 'Cookies', slug: 'spec/cookies' },
								{ label: 'SSL & Certificates', slug: 'spec/ssl' },
								{ label: 'Proxy', slug: 'spec/proxy' },
								{ label: 'Protocols', slug: 'spec/protocols' },
							],
						},
						{ label: 'cURL Integration', slug: 'spec/curl' },
					],
				},
				{
					label: 'Clients & Tools',
					items: [
						{ label: 'Overview', slug: 'clients/overview' },
						{ label: 'IDE Extensions', slug: 'clients/ide' },
						{ label: 'CLI Tools', slug: 'clients/cli' },
						{ label: 'Neovim Plugins', slug: 'clients/neovim' },
						{ label: 'Parser Libraries', slug: 'clients/parsers' },
					],
				},
				{
					label: 'Compatibility',
					items: [
						{ label: 'Overview', slug: 'compare/overview' },
						{ label: 'Core Syntax', slug: 'compare/core' },
						{ label: 'Variables & Environments', slug: 'compare/variables' },
						{ label: 'Scripting & Testing', slug: 'compare/scripting' },
						{ label: 'Protocols & Extensions', slug: 'compare/protocols' },
						{ label: 'Auth & Security', slug: 'compare/auth' },
						{ label: 'File Operations', slug: 'compare/file-operations' },
						{ label: 'cURL', slug: 'compare/curl' },
					],
				},
				{
					label: 'Standardization',
					items: [
						{ label: 'Process', slug: 'standardization/process' },
					],
				},
			],
		}),
	],
});
