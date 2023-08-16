require("dotenv").config({
  path: ".env.test"
});

jest.mock("@infra/providers/storage/supabase/supabase-storage");
