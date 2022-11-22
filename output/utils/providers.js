"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env['Supabase_URL'], process.env['Supabase_Service_Role']);
//# sourceMappingURL=providers.js.map