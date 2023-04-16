


minetest.register_node(minetest.get_current_modname()+":dirt", {on_punch: (pos: Position, node: Node, player: ObjectRef)=>{
    minetest.chat_send_all(pos.toString())
    if(player.is_player()){
        let a = player.get_inventory()
        if(minetest.get_player_control().LMB){
            minetest.chat_send_player(player.get_player_name(), "you pressed LMB")
        }
    }
}})

