
//trying to replicate https://rubenwardy.com/minetest_modding_book/en/players/formspecs.html in typescript
/** @noSelf **/
namespace Guessing {

    export const GUESSING_FORMNAME = "guessing:game"


    export function get_formspec(): string {
        let text = "I'm thinking whether the last guess was higher or lower"

        let formspec = `
formspec_version[6]
size[10,5]
button[2.8,2.9;4.1,1.7;guess;Guess]
field[1.1,1.8;8.2,0.9;number;Number;]
label[1.7,0.7; ${minetest.formspec_escape(text)} ... Make a guess!]
        `

        return text
    }


}

minetest.register_chatcommand("game", {
    privs: null, func: (name: string) => {
        minetest.show_formspec(name, Guessing.GUESSING_FORMNAME, Guessing.get_formspec())
    }
})

minetest.register_on_player_receive_fields((player, formname, fields) => {
    if (player.is_player() && formname === Guessing.GUESSING_FORMNAME) {
        if (fields.get("guess") != null) {
            minetest.chat_send_all(`${player.get_player_name()} guessed ${fields.get("number")}`)
        }
    }
})