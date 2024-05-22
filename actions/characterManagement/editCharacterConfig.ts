"use server";

import { updateServerCharacterConfig } from "@/prisma/services/characterService";

export default async function editCharacterConfig(
  server_id: string,
  data: {
    enable_creation?: boolean;
    vitals_names?: string[];
    attributes_names?: string[];
    statics_names?: string[];
  },
) {
  try {
    if (data.vitals_names) {
      const count = data.vitals_names.length;
      await updateServerCharacterConfig(server_id, {
        vitals_count: count,
        vitals_names: data.vitals_names,
      });
    }

    if (data.attributes_names) {
      const count = data.attributes_names.length;
      await updateServerCharacterConfig(server_id, {
        attributes_count: count,
        attributes_names: data.attributes_names,
      });
    }

    if (data.statics_names) {
      const count = data.statics_names.length;
      await updateServerCharacterConfig(server_id, {
        statics_count: count,
        statics_names: data.statics_names,
      });
    }

    await updateServerCharacterConfig(server_id, {
      enable_creation: data.enable_creation,
    });
  } catch (e) {
    throw new Error("Something went wrong");
  }
}
