"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
// Restricting the project to the sponser who created it
module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services["project-form"].create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services["project-form"].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models["project-form"] });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [project] = await strapi.services["project-form"].find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    // here it will check if the user try to edit the the same who create it or the user is teacher.
    if (!project && ctx.state.user.role.name !== "Teacher") {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["project-form"].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services["project-form"].update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models["project-form"] });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    const [project] = await strapi.services["project-form"].find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!project) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services["project-form"].delete({ id });

    return sanitizeEntity(entity, { model: strapi.models["project-form"] });
  },
};
