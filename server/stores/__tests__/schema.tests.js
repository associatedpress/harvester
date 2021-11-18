import parseSchema from '../schema'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const parseMarkdown = s => sanitizeHtml(marked(s || ''))

const describeFieldType = (opts) => {
  const {
    type,
    rawDefault,
    parsedDefault,
    options,
  } = opts

  const formType = 'd'
  const formId = '12345'
  const label = `[${type}] FIELD`

  const universalOptions = [
    {
      name: 'help',
      type: 'string',
      rawValue: 'some help text, more text. Hello: world.',
      parsedValue: 'some help text, more text. Hello: world.',
    },
    {
      name: 'key',
      type: 'string',
      rawValue: 'state',
      parsedValue: 'state',
    },
    {
      name: 'required',
      type: 'bool',
      rawValue: 'true',
      parsedValue: true,
    },
  ]

  describe(type, () => {
    it(`should parse a ${type} field`, () => {
      // GIVEN
      const configs = [
        ['column', label, type],
      ]

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.columns).toEqual([{
        id: 0,
        type,
        label,
        config: {},
      }])
    })

    it('should handle the relative option', () => {
      // GIVEN
      const relative = 'states'
      const options = [
        `relative:${relative}`,
      ]
      const configs = [
        ['column', label, type, ...options],
      ]

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.columns).toEqual([{
        id: 0,
        type,
        label,
        relative,
        config: {
          relative,
        },
      }])
    })

    const allOpts = [...universalOptions, ...options]
    allOpts.forEach(option => {
      it(`should handle the ${option.name} option as a ${option.type}`, () => {
        // GIVEN
        const options = [
          `${option.name}:${option.rawValue}`,
        ]
        const configs = [
          ['column', label, type, ...options],
        ]

        // WHEN
        const schema = parseSchema(formType, formId, configs)

        // THEN
        expect(schema.columns).toEqual([{
          id: 0,
          type,
          label,
          config: {
            [option.name]: option.parsedValue,
          },
        }])
      })
    })

    it('should throw on an unsupported option', () => {
      // GIVEN
      const name = 'foobarbizbing'
      const options = [
        `${name}:something`,
      ]
      const configs = [
        ['column', label, type, ...options],
      ]

      // WHEN
      const parse = () => parseSchema(formType, formId, configs)

      // THEN
      expect(parse).toThrow()
    })
  })
}

describe('schema', () => {
  describe('parseSchema', () => {
    it('should set the form type, id, and path', () => {
      // GIVEN
      const formType = 'd'
      const formId = '12345'
      const configs = []

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.form).toEqual({
        type: formType,
        id: formId,
        path: `/${formType}/${formId}`,
      })
    })

    it('should handle the headline config', () => {
      // GIVEN
      const formType = 'd'
      const formId = '12345'
      const headline = 'TEST HEADLINE'
      const configs = [
        ['headline', headline],
      ]

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.headline).toEqual(headline)
    })

    it('should handle the chatter config and parse it as markdown', () => {
      // GIVEN
      const formType = 'd'
      const formId = '12345'
      const chatter = 'TEST CHATTER'
      const configs = [
        ['chatter', chatter],
      ]

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.chatter).toEqual(parseMarkdown(chatter))
    })

    it('should handle the index config', () => {
      // GIVEN
      const formType = 'd'
      const formId = '12345'
      const index = 'index_column'
      const configs = [
        ['index', index],
      ]

      // WHEN
      const schema = parseSchema(formType, formId, configs)

      // THEN
      expect(schema.index).toEqual(index)
    })

    describe('column', () => {
      // string column type
      describeFieldType({
        type: 'string',
        options: [
          {
            name: 'default',
            type: 'string',
            rawValue: 'hello world',
            parsedValue: 'hello world',
          },
          {
            name: 'maxLength',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
          {
            name: 'regex',
            type: 'string',
            rawValue: '[A-Z]{2}[0-9]{6}',
            parsedValue: '[A-Z]{2}[0-9]{6}',
          },
        ],
      })

      // text column type
      describeFieldType({
        type: 'text',
        options: [
          {
            name: 'default',
            type: 'string',
            rawValue: 'hello world',
            parsedValue: 'hello world',
          },
          {
            name: 'rows',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
        ],
      })

      // number column type
      describeFieldType({
        type: 'number',
        options: [
          {
            name: 'default',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
          {
            name: 'min',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
          {
            name: 'max',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
        ],
      })

      // datetime column type
      describeFieldType({
        type: 'datetime',
        options: [
          {
            name: 'default',
            type: 'string',
            rawValue: '2020-11-02',
            parsedValue: '2020-11-02',
          },
          {
            name: 'min',
            type: 'string',
            rawValue: '2020-11-02',
            parsedValue: '2020-11-02',
          },
          {
            name: 'max',
            type: 'string',
            rawValue: '2020-11-02 10:15',
            parsedValue: '2020-11-02 10:15',
          },
          {
            name: 'time',
            type: 'bool',
            rawValue: 'false',
            parsedValue: false,
          },
          {
            name: 'date',
            type: 'bool',
            rawValue: 'false',
            parsedValue: false,
          },
        ],
      })

      // select column type
      describeFieldType({
        type: 'select',
        options: [
          {
            name: 'default',
            type: 'string',
            rawValue: 'New Mexico',
            parsedValue: 'New Mexico',
          },
          {
            name: 'min',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
          {
            name: 'max',
            type: 'number',
            rawValue: '10',
            parsedValue: 10,
          },
          {
            name: 'creatable',
            type: 'bool',
            rawValue: 'true',
            parsedValue: true,
          },
          {
            name: 'options',
            type: 'object',
            rawValue: 'states',
            parsedValue: { range: 'states' },
          },
          {
            name: 'optionlist',
            type: 'array',
            rawValue: 'yes,no,other',
            parsedValue: ['yes', 'no', 'other'],
          },
          {
            name: 'requires',
            type: 'string',
            rawValue: 'state',
            parsedValue: 'state',
          },
          {
            name: 'multiple',
            type: 'bool',
            rawValue: 'true',
            parsedValue: true,
          },
          {
            name: 'serialization',
            type: 'string',
            rawValue: 'json',
            parsedValue: 'json',
          },
        ],
      })

      // has_many column type
      describeFieldType({
        type: 'has_many',
        options: [
          {
            name: 'default',
            type: 'string',
            rawValue: '[["Blood On The Tracks",1]]',
            parsedValue: '[["Blood On The Tracks",1]]',
          },
          {
            name: 'serialization',
            type: 'string',
            rawValue: 'json',
            parsedValue: 'json',
          },
        ],
      })

      it('should throw on unsupported column type', () => {
        // GIVEN
        const formType = 'd'
        const formId = '12345'
        const type = 'foobarbizbing'
        const configs = [
          ['column', 'LABEL', type],
        ]

        // WHEN
        const parse = () => parseSchema(formType, formId, configs)

        // THEN
        expect(parse).toThrow()
      })
    })

    describe('relative_column', () => {
      it('should throw if no relative specified', () => {
        // GIVEN
        const formType = 'd'
        const formId = '12345'
        const configs = [
          ['relative_column', 'LABEL', 'string'],
        ]

        // WHEN
        const parse = () => parseSchema(formType, formId, configs)

        // THEN
        expect(parse).toThrow()
      })

      it('should parse config just like a column', () => {
        // GIVEN
        const formType = 'd'
        const formId = '12345'
        const relative = 'states'
        const opts = ['LABEL', 'number', 'min:10', `relative:${relative}`]
        const columnConfigs = [
          ['column', ...opts],
        ]
        const relativeConfigs = [
          ['relative_column', ...opts],
        ]

        // WHEN
        const columnSchema = parseSchema(formType, formId, columnConfigs)
        const relativeSchema = parseSchema(formType, formId, relativeConfigs)

        // THEN
        expect(columnSchema.columns).toEqual(relativeSchema.relatives[relative])
      })
    })

    describe('text', () => {
      it('should parse text as markdown', () => {
        // GIVEN
        const formType = 'd'
        const formId = '12345'
        const text = 'some **markdown**'
        const configs = [
          ['text', text],
        ]

        // WHEN
        const schema = parseSchema(formType, formId, configs)

        // THEN
        expect(schema.layout).toEqual([{
          type: 'text',
          html: parseMarkdown(text),
        }])
      })
    })

    describe('layout', () => {
      it('should interleave text and columns in layout blocks', () => {
        // GIVEN
        const formType = 'd'
        const formId = '12345'
        const text1 = 'some **markdown**'
        const text2 = 'some _more_ **markdown**'
        const configs = [
          ['text', text1],
          ['column', 'Name', 'string'],
          ['text', text2],
          ['column', 'Occupation', 'string'],
        ]

        // WHEN
        const schema = parseSchema(formType, formId, configs)

        // THEN
        expect(schema.columns).toHaveLength(2)
        expect(schema.layout).toEqual([
          {
            type: 'text',
            html: parseMarkdown(text1),
          },
          {
            type: 'column',
            index: 0,
          },
          {
            type: 'text',
            html: parseMarkdown(text2),
          },
          {
            type: 'column',
            index: 1,
          },
        ])
      })
    })
  })
})
