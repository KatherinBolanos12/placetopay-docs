import { config, fields, collection } from '@keystatic/core';
import { wrapper, repeating } from '@keystatic/core/content-components'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    checkout: collection({
      label: 'Checkout',
      slugField: 'title',
      path: 'src/pages/checkout/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        content: fields.mdx({
            label: 'Content',
            components: {
              Note: wrapper({
                label: 'Note',
                schema: {},
              }),
              Row: repeating({
                label: 'Row',
                schema: {},
                children: ['Col']
              }),
              Col: wrapper({
                label: 'Col',
                schema: {
                  sticky: fields.checkbox({ label: 'Sticky' }),
                },
              }),
              Properties: repeating({
                label: 'Properties',
                schema: {},
                children: ['Property']
              }),
              Property: wrapper({
                label: 'Property',
                schema: {
                  name: fields.text({ label: 'Name' }),
                  type: fields.text({ label: 'Type' }),
                  isRequired: fields.checkbox({ label: 'Required' }),
                },
              }),
            }
        }),
      },
    }),
    gateway: collection({
        label: 'Gateway',
        slugField: 'title',
        path: 'src/pages/gateway/*',
        format: { contentField: 'content' },
        schema: {
            title: fields.slug({ name: { label: 'Title' } }),
            description: fields.text({ label: 'Description' }),
            content: fields.mdx({
                label: 'Content',
            }),
        },
    }),
  },
});