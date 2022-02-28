const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})
const Joi = BaseJoi.extend(extension)

module.exports.MenuSchema = Joi.object({
    menu: Joi.object({
        name: Joi.string().required().escapeHTML(),
    }).required()
})

module.exports.ItemSchema = Joi.object({
    item: Joi.object({
        name: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0.0001),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
})