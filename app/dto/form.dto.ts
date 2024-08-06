import { z } from "zod";

import {
  FormCreateValidator,
  FormUpdateValidator,
} from "@validators/form.validator";

export type FormCreate = z.infer<typeof FormCreateValidator>;
export type FormUpdate = z.infer<typeof FormUpdateValidator>;
