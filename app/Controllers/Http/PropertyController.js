'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Property = use('App/Models/Property')

class PropertyController {

  async index () {
    const properties = Property.all()

    return properties;
  }


  async store ({ request, response }) {
  }

  async show ({ params }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }



  async update ({ params, request, response }) {
  }


  async destroy ({ params, auth, response }) {
    const property = await Property.findOrFail(params.id)

    if (property.user_id !== auth.user_id) {
      return response.status(401).send({ error: 'Sem autorização'})
    }

    await property.delete()
  }
}

module.exports = PropertyController
