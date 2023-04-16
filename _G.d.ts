interface NodeDefinition {
    description?: string,
    // assign one texture OR assign one texture to each face of the cube.
    tiles?: [string] | [string, string, string, string, string, string]
    //TODO: add Node Box support https://dev.minetest.net/Node_Drawtypes
    drawtype?: "normal" | "airlike" | "allfaces" | "allfaces_optional" | "glasslike" | "glasslike_framed" | "glasslike_framed_optional" | "liquid" | "flowingliquid" | "torchlike" | "signlike" | "plantlike" | "plantlike_rooted" | "raillike" | "fencelike" | "firelike" | "nodebox" | "mesh"
    visual_scale?: number, //default is 1
    /** Player will take this amount of damage if no bubbles are left */
    drowning?: number
    /** Valid for drawtypes:
mesh, nodebox, plantlike, allfaces_optional, liquid, flowingliquid.
- 1 - wave node like plants (node top moves side-to-side, bottom is fixed)
- 2 - wave node like leaves (whole node moves side-to-side)
- 3 - wave node like liquids (whole node moves up and down)
Not all models will properly wave.
plantlike drawtype can only wave like plants.
allfaces_optional drawtype can only wave like leaves.
liquid, flowingliquid drawtypes can only wave like liquids.*/
    waving?: 0 | 1 | 2 | 3
    drop?: string,
    //Returning true in on_timer will cause the timer to run again for the same interval
    on_timer?: (this: void, pos: Position) => boolean
    on_construct?: (this: void, pos: Position) => void
    on_destruct?: (this: void, pos: Position) => void
    after_destruct?: (this: void, pos: Position, oldnode: string) => void
    // TODO: make node table type
    preserve_metadata?: (this: void, pos: Position, oldnode: any, oldmeta: any, drops: ItemStack[]) => void
    /**
     * Called after constructing node when node was placed using
minetest.item_place_node / minetest.place_node.
* If return true no item is taken from itemstack.
* `placer` may be any valid ObjectRef or nil.
default: nil
     * 
     */
    after_place_node?: (this: void, pos: Position, placer: ObjectRef, itemstack: ItemStack, pointed_thing: PointedThing) => boolean;
    after_dig_node?: (this: void, pos: Position, oldnode: Node, oldmetadata: MetaDataRef, differ: ObjectRef) => void;

    on_punch?: (this: void, pos: Position, node: Node, player: ObjectRef) => void
    on_rightclick?: (this: void, pos: Position, node: Node, clicker: ObjectRef, itemstack: ItemStack, pointed_thing: PointedThing) => void;
    on_dig?: (this: void, pos: Position, node: Node, digger: ObjectRef) => void;
    on_metadata_inventory_put?: (this: void, pos: Position) => void;
    /**
     *  * intensity: 1.0 = mid range of regular TNT.
        * If defined, called when an explosion touches the node, instead of removing the node.
     */
    on_blast?: (this: void, pos: Position, intensity: number) => void;
}

type PointedThing = PointedThingNode | PointedThingObject | PointedThingNothing

interface Node {
    name: string,
    param1: number,
    param2: number
}

interface PointedThingNode {
    type: "node"
    above: Position
    under: Position
}

interface PointedThingNothing {
    type: "nothing"
}

interface PointedThingObject {
    type: "object"
    ref: ObjectRef
}

//https://minetest.gitlab.io/minetest/class-reference/#objectref
interface ObjectRef {
    get_pos(): Position
    set_pos(pos: Position): void
    get_velocity(): Position //returns the velocity, a vector.
    add_velocity(vel: Position): void, //example: add_velocity({x=0, y=6.5, z=0}) is equivalent to pressing jump key as a player.
    move_to(pos: Position, continuous: boolean): void;
    right_click(clicker: ObjectRef): void,
    get_hp(): number
    set_hp(hp: number, reason: string): void
    is_player(): boolean,
    punch(punches: ObjectRef, time_from_last_punch: number, tool_capabilities: Groups, direction: Position): void
    //Player only: TODO: continue!
    get_player_name(): string //returns "" if not a player
    get_look_dir(): Position
    get_look_vertical(): number //pitch in radians.
    get_look_horizontal(): number //yaw in radians.
    set_look_vertical(radians: number): void
    set_look_horizontal(radians: number): void
    get_breath(): number
    set_breath(value: number): void
    get_inventory(): InvRef
}

interface NodeTimerRef {
    set(timeout: number, elapsed: number): void // will trigger on_timer function after (timeout-elapsed) seconds
    /**
     * start a timer!
     * equivalent to `set(timeout, 0)`´`
     */
    start(timeout: number): void
    stop(): void,
    get_timeout(): number, // if timeout equals 0, timer is inactive
    get_elapsed(): number,
    is_started(): boolean
}

interface Position {
    x: number,
    y: number,
    z: number
}

interface Recipe {
    type?: "shaped"
    output: string
    // allow for 2x2 or 3x3 or 3x1 recipes:
    recipe: [[string, string], [string, string]] | [[string, string, string], [string, string, string], [string, string, string]]
}

interface Shapeless {
    type: "shapeless"
    output: string
    recipe: string[]
}

interface CookingRecipe {
    type: "cooking",
    output: string,
    recipe: string,
    cooktime: number,
}

interface Fuel {
    type: "fuel", //type is a keyword in typescript thats why qoutes.
    recipe: string,
    // how long the fuel lasts in seconds
    burntime: number
}

interface Groups {
    cracky?: number,
    crumbly?: number,
    oddly_breakable_by_hand?: number,
    choppy?: number,
    fleshy?: number,
    snappy?: number,
    explody?: number
}

interface MetaDataRef {
    contains(key: string): boolean
    get(key: string): string
    set_string(key: string, value: string): void
    get_string(key: string): string
    set_int(key: string, value: number): void
    get_int(key: string): number
    get_inventory(): InvRef
    set_float(key: string, value: number): void
    get_float(key: string): number
    to_table(): any
    from_table(data: any): void
    equals(other: MetaDataRef): boolean
}

interface ItemStackMetaRef extends MetaDataRef {
    set_tool_capabilities(groups: Groups): void
}

interface ItemStack {
    name: string
    count: number
    get_name(): string
    set_name(name: string): void
    is_known(): boolean
    get_stack_max(): number
    get_count(): number
    set_count(count: number): boolean
    is_empty(): boolean
    get_wear(): number
    set_wear(wear: number): boolean//returns boolean indicating whether item was cleared
    //TODO: specify types
    get_meta(): ItemStackMetaRef
    get_description(): string
    get_short_description(): string
    clear(): void
    replace(item: ItemStack): void
    to_string(): string
    to_table(): ItemStack
    get_stack_max(): number,
    get_free_space(): number,
    get_definition(): ItemStack,
    get_tool_capabilities(): Groups,
    add_wear(amount: number): void
    item_fits(item: ItemStack): boolean
    take_item(n: number): ItemStack
    peek_item(n: number): ItemStack
}

//https://minetest.gitlab.io/minetest/class-reference/#methods_1
interface InvRef {
    is_empty(listname: string): boolean,
    get_size(listname: string): number,
    set_size(listname: string, size: number): void
    get_width(listname: string): number
    set_width(listname: string, width: number): void
    get_stack(listname: string, index: number): ItemStack
    set_stack(listname: string, index: number, stack: ItemStack): void
    //TODO: add lists...
    add_item(listname: string, stack: ItemStack | { name: string, count: number }): ItemStack //returns leftover ItemStack
    room_for_item(listname: string, stack: ItemStack | { name: string, count: number }): boolean
    contains_item(listname: string, stack: ItemStack | { name: string, count: number }, match_meta?: boolean): boolean // If match_meta is false, only the items' names are compared 
    remove_item(listname: string, stack: ItemStack): ItemStack//note that any item metadata is ignored, so attempting to remove a specific unique item this way will likely remove the wrong one -
    get_location(): Position | { type: "undefined" }
}

interface ABMDef {
    nodenames: string[]
    neighbors?: string[],//Specifying a neighbour is optional. If you specify multiple neighbours, only one of them needs to be present to meet the requirements.
    interval: number //run every interval seconds
    chance: number //select every 1 in chance node
    action: (this: void, pos: Position, node: Node, active_object_count: number, active_object_count_wider: number) => void
}

interface RegisterCommand {
    //TODO add more privs
    privs?: { interact?: boolean, fly?: boolean, kick?: boolean, worldedit?: boolean } | any,
    func: ((this: void, name: string, param: string) => void) | ((this: void, player_name: string) => void);
}

interface PressedKeys {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
    jump: boolean
    aux1: boolean
    sneak: boolean
    dig: boolean
    place: boolean
    LMB: boolean // = dig
    RMB: boolean // = place
    zoom: boolean
}

interface Cheat {
    type: "moved_too_fast" | "interacted_too_far" | "interacted_with_self" | "interacted_while_dead" | "finished_unknown_dig" | "dug_unbreakable" | "dug_too_fast";
}

/**
 * https://minetest.gitlab.io/minetest/minetest-namespace-reference/#chat
 * 
 * - source for the docs comments: https://github.com/minetest/minetest/blob/master/doc/lua_api.txt
* @noSelf 
*/
declare namespace minetest {
    export const registered_nodes: Readonly<{ [key: string]: NodeDefinition }>
    export function get_current_modname(): string;
    export function get_node_timer(pos: Position): NodeTimerRef;
    export function get_node(pos: Position): Node
    export function set_node(pos: Position, block: { name: string }): void
    export function get_mod_storage(): MetaDataRef
    export function get_meta(pos: Position): MetaDataRef
    //You can set a node without deleting metadata or the inventory like so:
    export function swap_node(pos: Position, newblock: { name: string }): void
    export function remove_node(pos: Position): void
    export function delete_area(pos1: Position, pos2: Position): void
    export function get_modpath(modname: string): string;
    export function get_modnames(): string[];
    export function is_singleplayer(): boolean;
    export function register_alias(alias: string, original: string): void;
    export function register_node(name: string, properties: NodeDefinition): void;
    export function register_abm(abm_definition: ABMDef): void;
    export function chat_send_all(text: string): void;
    export function chat_send_player(name: string, text: string): void;
    export function register_craft(recipe: Recipe | Shapeless | CookingRecipe | Fuel): void;
    export function register_chatcommand(name: string, command: RegisterCommand): void;
    export function register_on_craft(callback: (this: void, output: ItemStack, player: ObjectRef, old_craft_grid: InvRef, craft_inv: InvRef) => ItemStack | null): void;
    export function register_on_craft_predict(callback: (this: void, output: ItemStack, player: ObjectRef, old_craft_grid: InvRef, craft_inv: InvRef) => ItemStack): void;
    export function get_player_control(): PressedKeys;

    export function register_on_cheat(callback: (this: void, player: ObjectRef, cheat: Cheat) => void): void;
    export function show_formspec(playername: string, formspecname: string, formspec: string): void;
    /**
     * Called when the server received input from `player` in a formspec with
      the given `formname`. Specifically, this is called on any of the
      following events:
          - a button was pressed,
          - Enter was pressed while the focus was on a text field
          - a checkbox was toggled,
          - something was selected in a dropdown list,
          - a different tab was selected,
          - selection was changed in a textlist or table,
          - an entry was double-clicked in a textlist or table,
          - a scrollbar was moved, or
          - the form was actively closed by the player.
 - Fields are sent for formspec elements which define a field. `fields`
      is a table containing each formspecs element value (as string), with
      the `name` parameter as index for each. The value depends on the
      formspec element type:
        - `animated_image`: Returns the index of the current frame.
        - `button` and variants: If pressed, contains the user-facing button
          text as value. If not pressed, is `nil`
        - `field`, `textarea` and variants: Text in the field
        - `dropdown`: Either the index or value, depending on the `index event`
          dropdown argument.
        - `tabheader`: Tab index, starting with `"1"` (only if tab changed)
        - `checkbox`: `"true"` if checked, `"false"` if unchecked
        - `textlist`: See `minetest.explode_textlist_event`
        - `table`: See `minetest.explode_table_event`
        - `scrollbar`: See `minetest.explode_scrollbar_event`
        - Special case: `["quit"]="true"` is sent when the user actively
          closed the form by mouse click, keypress or through a button_exit[]
          element.
        - Special case: `["key_enter"]="true"` is sent when the user pressed
          the Enter key and the focus was either nowhere (causing the formspec
          to be closed) or on a button. If the focus was on a text field,
          additionally, the index `key_enter_field` contains the name of the
          text field. See also: `field_close_on_enter`.
    - Newest functions are called first
    - If function returns `true`, remaining functions are not called
    
     */
    export function register_on_player_receive_fields(callback: (this: void, player: ObjectRef, formname: string, fields: Map<String, any>) => void): void;
    export function formspec_escape(string: string): string;
    export function register_on_chat_message(callback: (this: void, name: string, message: string) => boolean): void;
    /**
    * returns a rating
    * Get rating of a group of an item. (`0` means: not in group)
     */
    export function get_item_group(stack_name: string, group_name: string): 0 | any;
    /**
     * 
     - Returning `true` restricts the player `name` from modifying (i.e. digging, placing) the node at position `pos`.
     - `name` will be `""` for non-players or unknown players.
     - This function should be overridden by protection mods. It is highly
     recommended to grant access to players with the `protection_bypass` privilege.
     - Cache and call the old version of this function if the position is
      not protected by the mod. This will allow using multiple protection mods.
     * 
     * @param pos 
     * @param name 
     * @returns boolean
     */
    export function is_protected(pos: Position, name: string): boolean;
    /**
     * - `minetest.is_creative_enabled(name)`: returns boolean
    - Returning `true` means that Creative Mode is enabled for player `name`.
    - `name` will be `""` for non-players or if the player is unknown.
    - This function should be overridden by Creative Mode-related mods to
      implement a per-player Creative Mode.
    - By default, this function returns `true` if the setting
      `creative_mode` is `true` and `false` otherwise.
     */
    export function is_creative_enabled(name: string): boolean
}