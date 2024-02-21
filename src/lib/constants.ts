import { rgbToHex } from "@/lib/utils";

// kist standard color
export const INDIGO = rgbToHex(1,62,110);
export const LIGHT_BLUE = rgbToHex(230,236,240);
export const PINK = rgbToHex(219,83,101);
export const ORANGE = rgbToHex(234,140,46);
export const GREEN = rgbToHex(183,184,51);
export const TIFFANY = rgbToHex(46,182,170);

// account
export const USERS = [{ username: "誠致", email: "zhi@chengzhiedu.org", mobile: "", password: "kist" },
                      { username: "阿依", email: "one@gmail.com", mobile: "0912345678", password: "1234" },
                      { username: "阿參", email: "three@gmail.com", mobile: "0933333333", password: "3333" },                    
                    ];

// info
export const INFO = [{ email: "one@gmail.com", info: ["三民國小","六年級導師","社會","國小社會領召"] },
                     { email: "three@gmail.com", info: ["三民國小","校長","自然",""] },
                    ];