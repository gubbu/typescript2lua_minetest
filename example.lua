--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
minetest.register_alias("dirt", "more_dirt")
minetest.register_craft({type = "shaped", output = "mymod:diamond_chair", recipe = {{"mymod:diamond_fragments", "", ""}, {"mymod:diamond_fragments", "mymod:diamond_fragments", ""}, {"mymod:diamond_fragments", "mymod:diamond_fragments", ""}}})
minetest.register_craft({type = "fuel", recipe = "", burntime = 10})
minetest.register_node(
    "default:dirt",
    {
        description = "meh",
        tiles = {"1"},
        on_punch = function(pos, node, player)
            minetest.chat_send_all(
                tostring(pos.x)
            )
        end
    }
)
all_mods = minetest.get_modnames()
if minetest.registered_nodes["default:abc"].drawtype == "normal" then
end
