--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
minetest.register_node(
    tostring(
        minetest.get_current_modname()
    ) .. ":dirt",
    {
        on_punch = function(pos, node, player)
            minetest.chat_send_all(
                tostring(pos)
            )
            if player:is_player() then
                local a = player:get_inventory()
                if minetest.get_player_control().LMB then
                    minetest.chat_send_player(
                        player:get_player_name(),
                        "you pressed LMB"
                    )
                end
            end
        end
    }
)
