import { Injectable } from "@nestjs/common";

import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { Storage } from "../storage";

@Injectable()
export class SupabaseStorage implements Storage {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<{ path: string }> {
    const { data } = await this.client.storage
      .from(process.env.SUPABASE_AVATAR_BUCKET)
      .upload(`${folder}/${file.originalname}`, file.buffer, {
        upsert: true
      });

    return data;
  }
}
