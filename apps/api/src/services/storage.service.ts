import { createClient } from "@supabase/supabase-js";
import { config } from "../config.js";
import { AppError } from "../lib/errors.js";
export async function createSignedUpload(path:string){
  if(!config.SUPABASE_URL||!config.SUPABASE_SERVICE_ROLE_KEY) throw new AppError(503,"STORAGE_NOT_CONFIGURED","Supabase Storage is not configured");
  const client=createClient(config.SUPABASE_URL,config.SUPABASE_SERVICE_ROLE_KEY);
  const {data,error}=await client.storage.from(config.SUPABASE_BUCKET).createSignedUploadUrl(path);
  if(error) throw new AppError(502,"STORAGE_ERROR",error.message);
  return data;
}
