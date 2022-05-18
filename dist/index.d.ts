interface Entity {
    timestamp: number;
    expired_second: number;
    key: string;
    value: string;
}
declare class ZStorage {
    _isSupport: boolean;
    /**
     * 构造器
     * constructor
     */
    constructor();
    /**
     * 获取时间戳
     */
    static get timestamp(): number;
    /**
     * 判断是否失效
     * @param {Entity} entity 存储实例
     */
    static __isExpired(entity: Entity): boolean;
    /**
     * 存入
     * @param {String} key 键
     * @param {String} value 值
     * @param {Number} expired_second 过期时间 单位秒
     */
    set(key?: string | null, value?: string | null, expired_second?: number | null): true | null;
    /**
     * 读取
     * @param {String} key 键
     */
    get(key?: string): string | null;
    /**
     * 删除存储
     * @param {String} key 键
     */
    remove(key?: string): true | null;
    /**
     * 清空存储
     */
    clear(): true | null;
}
declare const _default: ZStorage;
export default _default;
