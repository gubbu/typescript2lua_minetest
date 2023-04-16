--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
Guessing = Guessing or ({})
do
    Guessing.GUESSING_FORMNAME = "guessing:game"
    function Guessing.get_formspec()
        local text = "I'm thinking whether the last guess was higher or lower"
        local formspec = ("\nformspec_version[6]\nsize[10,5]\nbutton[2.8,2.9;4.1,1.7;guess;Guess]\nfield[1.1,1.8;8.2,0.9;number;Number;]\nlabel[1.7,0.7; " .. minetest.formspec_escape(text)) .. " ... Make a guess!]\n        "
        return text
    end
end
minetest.register_chatcommand(
    "game",
    {
        privs = nil,
        func = function(name)
            minetest.show_formspec(
                name,
                Guessing.GUESSING_FORMNAME,
                Guessing.get_formspec()
            )
        end
    }
)
minetest.register_on_player_receive_fields(
    function(player, formname, fields)
        if player:is_player() and (formname == Guessing.GUESSING_FORMNAME) then
            if fields:get("guess") ~= nil then
                minetest.chat_send_all(
                    (player:get_player_name() .. " guessed ") .. tostring(
                        fields:get("number")
                    )
                )
            end
        end
    end
)
