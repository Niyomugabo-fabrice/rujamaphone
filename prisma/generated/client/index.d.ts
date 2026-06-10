
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Smartphone
 * 
 */
export type Smartphone = $Result.DefaultSelection<Prisma.$SmartphonePayload>
/**
 * Model Speaker
 * 
 */
export type Speaker = $Result.DefaultSelection<Prisma.$SpeakerPayload>
/**
 * Model Accessory
 * 
 */
export type Accessory = $Result.DefaultSelection<Prisma.$AccessoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Condition: {
  NEW: 'NEW',
  USED: 'USED'
};

export type Condition = (typeof Condition)[keyof typeof Condition]


export const StorageCapacity: {
  GB64: 'GB64',
  GB128: 'GB128',
  GB256: 'GB256',
  GB512: 'GB512',
  TB1: 'TB1'
};

export type StorageCapacity = (typeof StorageCapacity)[keyof typeof StorageCapacity]


export const SmartphoneBrand: {
  APPLE: 'APPLE',
  SAMSUNG: 'SAMSUNG',
  GOOGLE: 'GOOGLE',
  XIAOMI: 'XIAOMI',
  ONEPLUS: 'ONEPLUS'
};

export type SmartphoneBrand = (typeof SmartphoneBrand)[keyof typeof SmartphoneBrand]


export const SpeakerBrand: {
  JBL: 'JBL',
  SONY: 'SONY',
  BOSE: 'BOSE',
  APPLE: 'APPLE',
  ANKER: 'ANKER'
};

export type SpeakerBrand = (typeof SpeakerBrand)[keyof typeof SpeakerBrand]


export const AccessoryBrand: {
  APPLE: 'APPLE',
  SAMSUNG: 'SAMSUNG',
  ANKER: 'ANKER',
  BASEUS: 'BASEUS',
  GENERIC: 'GENERIC'
};

export type AccessoryBrand = (typeof AccessoryBrand)[keyof typeof AccessoryBrand]

}

export type Condition = $Enums.Condition

export const Condition: typeof $Enums.Condition

export type StorageCapacity = $Enums.StorageCapacity

export const StorageCapacity: typeof $Enums.StorageCapacity

export type SmartphoneBrand = $Enums.SmartphoneBrand

export const SmartphoneBrand: typeof $Enums.SmartphoneBrand

export type SpeakerBrand = $Enums.SpeakerBrand

export const SpeakerBrand: typeof $Enums.SpeakerBrand

export type AccessoryBrand = $Enums.AccessoryBrand

export const AccessoryBrand: typeof $Enums.AccessoryBrand

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Smartphones
 * const smartphones = await prisma.smartphone.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Smartphones
   * const smartphones = await prisma.smartphone.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.smartphone`: Exposes CRUD operations for the **Smartphone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Smartphones
    * const smartphones = await prisma.smartphone.findMany()
    * ```
    */
  get smartphone(): Prisma.SmartphoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.speaker`: Exposes CRUD operations for the **Speaker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Speakers
    * const speakers = await prisma.speaker.findMany()
    * ```
    */
  get speaker(): Prisma.SpeakerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessory`: Exposes CRUD operations for the **Accessory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accessories
    * const accessories = await prisma.accessory.findMany()
    * ```
    */
  get accessory(): Prisma.AccessoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Smartphone: 'Smartphone',
    Speaker: 'Speaker',
    Accessory: 'Accessory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "smartphone" | "speaker" | "accessory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Smartphone: {
        payload: Prisma.$SmartphonePayload<ExtArgs>
        fields: Prisma.SmartphoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SmartphoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SmartphoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          findFirst: {
            args: Prisma.SmartphoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SmartphoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          findMany: {
            args: Prisma.SmartphoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>[]
          }
          create: {
            args: Prisma.SmartphoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          createMany: {
            args: Prisma.SmartphoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SmartphoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>[]
          }
          delete: {
            args: Prisma.SmartphoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          update: {
            args: Prisma.SmartphoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          deleteMany: {
            args: Prisma.SmartphoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SmartphoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SmartphoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>[]
          }
          upsert: {
            args: Prisma.SmartphoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmartphonePayload>
          }
          aggregate: {
            args: Prisma.SmartphoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSmartphone>
          }
          groupBy: {
            args: Prisma.SmartphoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SmartphoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SmartphoneCountArgs<ExtArgs>
            result: $Utils.Optional<SmartphoneCountAggregateOutputType> | number
          }
        }
      }
      Speaker: {
        payload: Prisma.$SpeakerPayload<ExtArgs>
        fields: Prisma.SpeakerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpeakerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpeakerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          findFirst: {
            args: Prisma.SpeakerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpeakerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          findMany: {
            args: Prisma.SpeakerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          create: {
            args: Prisma.SpeakerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          createMany: {
            args: Prisma.SpeakerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpeakerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          delete: {
            args: Prisma.SpeakerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          update: {
            args: Prisma.SpeakerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          deleteMany: {
            args: Prisma.SpeakerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpeakerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpeakerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          upsert: {
            args: Prisma.SpeakerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          aggregate: {
            args: Prisma.SpeakerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpeaker>
          }
          groupBy: {
            args: Prisma.SpeakerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpeakerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpeakerCountArgs<ExtArgs>
            result: $Utils.Optional<SpeakerCountAggregateOutputType> | number
          }
        }
      }
      Accessory: {
        payload: Prisma.$AccessoryPayload<ExtArgs>
        fields: Prisma.AccessoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          findFirst: {
            args: Prisma.AccessoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          findMany: {
            args: Prisma.AccessoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          create: {
            args: Prisma.AccessoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          createMany: {
            args: Prisma.AccessoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          delete: {
            args: Prisma.AccessoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          update: {
            args: Prisma.AccessoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          deleteMany: {
            args: Prisma.AccessoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>[]
          }
          upsert: {
            args: Prisma.AccessoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessoryPayload>
          }
          aggregate: {
            args: Prisma.AccessoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessory>
          }
          groupBy: {
            args: Prisma.AccessoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessoryCountArgs<ExtArgs>
            result: $Utils.Optional<AccessoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    smartphone?: SmartphoneOmit
    speaker?: SpeakerOmit
    accessory?: AccessoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Smartphone
   */

  export type AggregateSmartphone = {
    _count: SmartphoneCountAggregateOutputType | null
    _avg: SmartphoneAvgAggregateOutputType | null
    _sum: SmartphoneSumAggregateOutputType | null
    _min: SmartphoneMinAggregateOutputType | null
    _max: SmartphoneMaxAggregateOutputType | null
  }

  export type SmartphoneAvgAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type SmartphoneSumAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type SmartphoneMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    storage: $Enums.StorageCapacity | null
    condition: $Enums.Condition | null
    brand: $Enums.SmartphoneBrand | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SmartphoneMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    storage: $Enums.StorageCapacity | null
    condition: $Enums.Condition | null
    brand: $Enums.SmartphoneBrand | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SmartphoneCountAggregateOutputType = {
    id: number
    name: number
    price: number
    image: number
    description: number
    rating: number
    reviews: number
    storage: number
    condition: number
    brand: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SmartphoneAvgAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type SmartphoneSumAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type SmartphoneMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    storage?: true
    condition?: true
    brand?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SmartphoneMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    storage?: true
    condition?: true
    brand?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SmartphoneCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    image?: true
    description?: true
    rating?: true
    reviews?: true
    storage?: true
    condition?: true
    brand?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SmartphoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Smartphone to aggregate.
     */
    where?: SmartphoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Smartphones to fetch.
     */
    orderBy?: SmartphoneOrderByWithRelationInput | SmartphoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SmartphoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Smartphones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Smartphones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Smartphones
    **/
    _count?: true | SmartphoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SmartphoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SmartphoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SmartphoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SmartphoneMaxAggregateInputType
  }

  export type GetSmartphoneAggregateType<T extends SmartphoneAggregateArgs> = {
        [P in keyof T & keyof AggregateSmartphone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSmartphone[P]>
      : GetScalarType<T[P], AggregateSmartphone[P]>
  }




  export type SmartphoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SmartphoneWhereInput
    orderBy?: SmartphoneOrderByWithAggregationInput | SmartphoneOrderByWithAggregationInput[]
    by: SmartphoneScalarFieldEnum[] | SmartphoneScalarFieldEnum
    having?: SmartphoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SmartphoneCountAggregateInputType | true
    _avg?: SmartphoneAvgAggregateInputType
    _sum?: SmartphoneSumAggregateInputType
    _min?: SmartphoneMinAggregateInputType
    _max?: SmartphoneMaxAggregateInputType
  }

  export type SmartphoneGroupByOutputType = {
    id: string
    name: string
    price: number
    image: string[]
    description: string | null
    rating: number
    reviews: number
    storage: $Enums.StorageCapacity
    condition: $Enums.Condition
    brand: $Enums.SmartphoneBrand
    createdAt: Date
    updatedAt: Date
    _count: SmartphoneCountAggregateOutputType | null
    _avg: SmartphoneAvgAggregateOutputType | null
    _sum: SmartphoneSumAggregateOutputType | null
    _min: SmartphoneMinAggregateOutputType | null
    _max: SmartphoneMaxAggregateOutputType | null
  }

  type GetSmartphoneGroupByPayload<T extends SmartphoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SmartphoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SmartphoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SmartphoneGroupByOutputType[P]>
            : GetScalarType<T[P], SmartphoneGroupByOutputType[P]>
        }
      >
    >


  export type SmartphoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    storage?: boolean
    condition?: boolean
    brand?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["smartphone"]>

  export type SmartphoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    storage?: boolean
    condition?: boolean
    brand?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["smartphone"]>

  export type SmartphoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    storage?: boolean
    condition?: boolean
    brand?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["smartphone"]>

  export type SmartphoneSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    storage?: boolean
    condition?: boolean
    brand?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SmartphoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "image" | "description" | "rating" | "reviews" | "storage" | "condition" | "brand" | "createdAt" | "updatedAt", ExtArgs["result"]["smartphone"]>

  export type $SmartphonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Smartphone"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      image: string[]
      description: string | null
      rating: number
      reviews: number
      storage: $Enums.StorageCapacity
      condition: $Enums.Condition
      brand: $Enums.SmartphoneBrand
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["smartphone"]>
    composites: {}
  }

  type SmartphoneGetPayload<S extends boolean | null | undefined | SmartphoneDefaultArgs> = $Result.GetResult<Prisma.$SmartphonePayload, S>

  type SmartphoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SmartphoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SmartphoneCountAggregateInputType | true
    }

  export interface SmartphoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Smartphone'], meta: { name: 'Smartphone' } }
    /**
     * Find zero or one Smartphone that matches the filter.
     * @param {SmartphoneFindUniqueArgs} args - Arguments to find a Smartphone
     * @example
     * // Get one Smartphone
     * const smartphone = await prisma.smartphone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SmartphoneFindUniqueArgs>(args: SelectSubset<T, SmartphoneFindUniqueArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Smartphone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SmartphoneFindUniqueOrThrowArgs} args - Arguments to find a Smartphone
     * @example
     * // Get one Smartphone
     * const smartphone = await prisma.smartphone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SmartphoneFindUniqueOrThrowArgs>(args: SelectSubset<T, SmartphoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Smartphone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneFindFirstArgs} args - Arguments to find a Smartphone
     * @example
     * // Get one Smartphone
     * const smartphone = await prisma.smartphone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SmartphoneFindFirstArgs>(args?: SelectSubset<T, SmartphoneFindFirstArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Smartphone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneFindFirstOrThrowArgs} args - Arguments to find a Smartphone
     * @example
     * // Get one Smartphone
     * const smartphone = await prisma.smartphone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SmartphoneFindFirstOrThrowArgs>(args?: SelectSubset<T, SmartphoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Smartphones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Smartphones
     * const smartphones = await prisma.smartphone.findMany()
     * 
     * // Get first 10 Smartphones
     * const smartphones = await prisma.smartphone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const smartphoneWithIdOnly = await prisma.smartphone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SmartphoneFindManyArgs>(args?: SelectSubset<T, SmartphoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Smartphone.
     * @param {SmartphoneCreateArgs} args - Arguments to create a Smartphone.
     * @example
     * // Create one Smartphone
     * const Smartphone = await prisma.smartphone.create({
     *   data: {
     *     // ... data to create a Smartphone
     *   }
     * })
     * 
     */
    create<T extends SmartphoneCreateArgs>(args: SelectSubset<T, SmartphoneCreateArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Smartphones.
     * @param {SmartphoneCreateManyArgs} args - Arguments to create many Smartphones.
     * @example
     * // Create many Smartphones
     * const smartphone = await prisma.smartphone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SmartphoneCreateManyArgs>(args?: SelectSubset<T, SmartphoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Smartphones and returns the data saved in the database.
     * @param {SmartphoneCreateManyAndReturnArgs} args - Arguments to create many Smartphones.
     * @example
     * // Create many Smartphones
     * const smartphone = await prisma.smartphone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Smartphones and only return the `id`
     * const smartphoneWithIdOnly = await prisma.smartphone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SmartphoneCreateManyAndReturnArgs>(args?: SelectSubset<T, SmartphoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Smartphone.
     * @param {SmartphoneDeleteArgs} args - Arguments to delete one Smartphone.
     * @example
     * // Delete one Smartphone
     * const Smartphone = await prisma.smartphone.delete({
     *   where: {
     *     // ... filter to delete one Smartphone
     *   }
     * })
     * 
     */
    delete<T extends SmartphoneDeleteArgs>(args: SelectSubset<T, SmartphoneDeleteArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Smartphone.
     * @param {SmartphoneUpdateArgs} args - Arguments to update one Smartphone.
     * @example
     * // Update one Smartphone
     * const smartphone = await prisma.smartphone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SmartphoneUpdateArgs>(args: SelectSubset<T, SmartphoneUpdateArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Smartphones.
     * @param {SmartphoneDeleteManyArgs} args - Arguments to filter Smartphones to delete.
     * @example
     * // Delete a few Smartphones
     * const { count } = await prisma.smartphone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SmartphoneDeleteManyArgs>(args?: SelectSubset<T, SmartphoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Smartphones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Smartphones
     * const smartphone = await prisma.smartphone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SmartphoneUpdateManyArgs>(args: SelectSubset<T, SmartphoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Smartphones and returns the data updated in the database.
     * @param {SmartphoneUpdateManyAndReturnArgs} args - Arguments to update many Smartphones.
     * @example
     * // Update many Smartphones
     * const smartphone = await prisma.smartphone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Smartphones and only return the `id`
     * const smartphoneWithIdOnly = await prisma.smartphone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SmartphoneUpdateManyAndReturnArgs>(args: SelectSubset<T, SmartphoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Smartphone.
     * @param {SmartphoneUpsertArgs} args - Arguments to update or create a Smartphone.
     * @example
     * // Update or create a Smartphone
     * const smartphone = await prisma.smartphone.upsert({
     *   create: {
     *     // ... data to create a Smartphone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Smartphone we want to update
     *   }
     * })
     */
    upsert<T extends SmartphoneUpsertArgs>(args: SelectSubset<T, SmartphoneUpsertArgs<ExtArgs>>): Prisma__SmartphoneClient<$Result.GetResult<Prisma.$SmartphonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Smartphones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneCountArgs} args - Arguments to filter Smartphones to count.
     * @example
     * // Count the number of Smartphones
     * const count = await prisma.smartphone.count({
     *   where: {
     *     // ... the filter for the Smartphones we want to count
     *   }
     * })
    **/
    count<T extends SmartphoneCountArgs>(
      args?: Subset<T, SmartphoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SmartphoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Smartphone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SmartphoneAggregateArgs>(args: Subset<T, SmartphoneAggregateArgs>): Prisma.PrismaPromise<GetSmartphoneAggregateType<T>>

    /**
     * Group by Smartphone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartphoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SmartphoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SmartphoneGroupByArgs['orderBy'] }
        : { orderBy?: SmartphoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SmartphoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmartphoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Smartphone model
   */
  readonly fields: SmartphoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Smartphone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SmartphoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Smartphone model
   */
  interface SmartphoneFieldRefs {
    readonly id: FieldRef<"Smartphone", 'String'>
    readonly name: FieldRef<"Smartphone", 'String'>
    readonly price: FieldRef<"Smartphone", 'Int'>
    readonly image: FieldRef<"Smartphone", 'String[]'>
    readonly description: FieldRef<"Smartphone", 'String'>
    readonly rating: FieldRef<"Smartphone", 'Float'>
    readonly reviews: FieldRef<"Smartphone", 'Int'>
    readonly storage: FieldRef<"Smartphone", 'StorageCapacity'>
    readonly condition: FieldRef<"Smartphone", 'Condition'>
    readonly brand: FieldRef<"Smartphone", 'SmartphoneBrand'>
    readonly createdAt: FieldRef<"Smartphone", 'DateTime'>
    readonly updatedAt: FieldRef<"Smartphone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Smartphone findUnique
   */
  export type SmartphoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter, which Smartphone to fetch.
     */
    where: SmartphoneWhereUniqueInput
  }

  /**
   * Smartphone findUniqueOrThrow
   */
  export type SmartphoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter, which Smartphone to fetch.
     */
    where: SmartphoneWhereUniqueInput
  }

  /**
   * Smartphone findFirst
   */
  export type SmartphoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter, which Smartphone to fetch.
     */
    where?: SmartphoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Smartphones to fetch.
     */
    orderBy?: SmartphoneOrderByWithRelationInput | SmartphoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Smartphones.
     */
    cursor?: SmartphoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Smartphones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Smartphones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Smartphones.
     */
    distinct?: SmartphoneScalarFieldEnum | SmartphoneScalarFieldEnum[]
  }

  /**
   * Smartphone findFirstOrThrow
   */
  export type SmartphoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter, which Smartphone to fetch.
     */
    where?: SmartphoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Smartphones to fetch.
     */
    orderBy?: SmartphoneOrderByWithRelationInput | SmartphoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Smartphones.
     */
    cursor?: SmartphoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Smartphones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Smartphones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Smartphones.
     */
    distinct?: SmartphoneScalarFieldEnum | SmartphoneScalarFieldEnum[]
  }

  /**
   * Smartphone findMany
   */
  export type SmartphoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter, which Smartphones to fetch.
     */
    where?: SmartphoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Smartphones to fetch.
     */
    orderBy?: SmartphoneOrderByWithRelationInput | SmartphoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Smartphones.
     */
    cursor?: SmartphoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Smartphones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Smartphones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Smartphones.
     */
    distinct?: SmartphoneScalarFieldEnum | SmartphoneScalarFieldEnum[]
  }

  /**
   * Smartphone create
   */
  export type SmartphoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * The data needed to create a Smartphone.
     */
    data: XOR<SmartphoneCreateInput, SmartphoneUncheckedCreateInput>
  }

  /**
   * Smartphone createMany
   */
  export type SmartphoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Smartphones.
     */
    data: SmartphoneCreateManyInput | SmartphoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Smartphone createManyAndReturn
   */
  export type SmartphoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * The data used to create many Smartphones.
     */
    data: SmartphoneCreateManyInput | SmartphoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Smartphone update
   */
  export type SmartphoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * The data needed to update a Smartphone.
     */
    data: XOR<SmartphoneUpdateInput, SmartphoneUncheckedUpdateInput>
    /**
     * Choose, which Smartphone to update.
     */
    where: SmartphoneWhereUniqueInput
  }

  /**
   * Smartphone updateMany
   */
  export type SmartphoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Smartphones.
     */
    data: XOR<SmartphoneUpdateManyMutationInput, SmartphoneUncheckedUpdateManyInput>
    /**
     * Filter which Smartphones to update
     */
    where?: SmartphoneWhereInput
    /**
     * Limit how many Smartphones to update.
     */
    limit?: number
  }

  /**
   * Smartphone updateManyAndReturn
   */
  export type SmartphoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * The data used to update Smartphones.
     */
    data: XOR<SmartphoneUpdateManyMutationInput, SmartphoneUncheckedUpdateManyInput>
    /**
     * Filter which Smartphones to update
     */
    where?: SmartphoneWhereInput
    /**
     * Limit how many Smartphones to update.
     */
    limit?: number
  }

  /**
   * Smartphone upsert
   */
  export type SmartphoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * The filter to search for the Smartphone to update in case it exists.
     */
    where: SmartphoneWhereUniqueInput
    /**
     * In case the Smartphone found by the `where` argument doesn't exist, create a new Smartphone with this data.
     */
    create: XOR<SmartphoneCreateInput, SmartphoneUncheckedCreateInput>
    /**
     * In case the Smartphone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SmartphoneUpdateInput, SmartphoneUncheckedUpdateInput>
  }

  /**
   * Smartphone delete
   */
  export type SmartphoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
    /**
     * Filter which Smartphone to delete.
     */
    where: SmartphoneWhereUniqueInput
  }

  /**
   * Smartphone deleteMany
   */
  export type SmartphoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Smartphones to delete
     */
    where?: SmartphoneWhereInput
    /**
     * Limit how many Smartphones to delete.
     */
    limit?: number
  }

  /**
   * Smartphone without action
   */
  export type SmartphoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Smartphone
     */
    select?: SmartphoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Smartphone
     */
    omit?: SmartphoneOmit<ExtArgs> | null
  }


  /**
   * Model Speaker
   */

  export type AggregateSpeaker = {
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  export type SpeakerAvgAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type SpeakerSumAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type SpeakerMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    condition: $Enums.Condition | null
    brand: $Enums.SpeakerBrand | null
    batteryLife: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpeakerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    condition: $Enums.Condition | null
    brand: $Enums.SpeakerBrand | null
    batteryLife: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpeakerCountAggregateOutputType = {
    id: number
    name: number
    price: number
    image: number
    description: number
    rating: number
    reviews: number
    condition: number
    brand: number
    batteryLife: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpeakerAvgAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type SpeakerSumAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type SpeakerMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    batteryLife?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpeakerMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    batteryLife?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpeakerCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    image?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    batteryLife?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpeakerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Speaker to aggregate.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Speakers
    **/
    _count?: true | SpeakerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpeakerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpeakerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpeakerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpeakerMaxAggregateInputType
  }

  export type GetSpeakerAggregateType<T extends SpeakerAggregateArgs> = {
        [P in keyof T & keyof AggregateSpeaker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpeaker[P]>
      : GetScalarType<T[P], AggregateSpeaker[P]>
  }




  export type SpeakerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpeakerWhereInput
    orderBy?: SpeakerOrderByWithAggregationInput | SpeakerOrderByWithAggregationInput[]
    by: SpeakerScalarFieldEnum[] | SpeakerScalarFieldEnum
    having?: SpeakerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpeakerCountAggregateInputType | true
    _avg?: SpeakerAvgAggregateInputType
    _sum?: SpeakerSumAggregateInputType
    _min?: SpeakerMinAggregateInputType
    _max?: SpeakerMaxAggregateInputType
  }

  export type SpeakerGroupByOutputType = {
    id: string
    name: string
    price: number
    image: string[]
    description: string | null
    rating: number
    reviews: number
    condition: $Enums.Condition
    brand: $Enums.SpeakerBrand
    batteryLife: string | null
    createdAt: Date
    updatedAt: Date
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  type GetSpeakerGroupByPayload<T extends SpeakerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpeakerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpeakerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
            : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
        }
      >
    >


  export type SpeakerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    batteryLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    batteryLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    batteryLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    batteryLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpeakerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "image" | "description" | "rating" | "reviews" | "condition" | "brand" | "batteryLife" | "createdAt" | "updatedAt", ExtArgs["result"]["speaker"]>

  export type $SpeakerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Speaker"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      image: string[]
      description: string | null
      rating: number
      reviews: number
      condition: $Enums.Condition
      brand: $Enums.SpeakerBrand
      batteryLife: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["speaker"]>
    composites: {}
  }

  type SpeakerGetPayload<S extends boolean | null | undefined | SpeakerDefaultArgs> = $Result.GetResult<Prisma.$SpeakerPayload, S>

  type SpeakerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpeakerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpeakerCountAggregateInputType | true
    }

  export interface SpeakerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Speaker'], meta: { name: 'Speaker' } }
    /**
     * Find zero or one Speaker that matches the filter.
     * @param {SpeakerFindUniqueArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpeakerFindUniqueArgs>(args: SelectSubset<T, SpeakerFindUniqueArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Speaker that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpeakerFindUniqueOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpeakerFindUniqueOrThrowArgs>(args: SelectSubset<T, SpeakerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindFirstArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpeakerFindFirstArgs>(args?: SelectSubset<T, SpeakerFindFirstArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindFirstOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpeakerFindFirstOrThrowArgs>(args?: SelectSubset<T, SpeakerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Speakers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Speakers
     * const speakers = await prisma.speaker.findMany()
     * 
     * // Get first 10 Speakers
     * const speakers = await prisma.speaker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const speakerWithIdOnly = await prisma.speaker.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpeakerFindManyArgs>(args?: SelectSubset<T, SpeakerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Speaker.
     * @param {SpeakerCreateArgs} args - Arguments to create a Speaker.
     * @example
     * // Create one Speaker
     * const Speaker = await prisma.speaker.create({
     *   data: {
     *     // ... data to create a Speaker
     *   }
     * })
     * 
     */
    create<T extends SpeakerCreateArgs>(args: SelectSubset<T, SpeakerCreateArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Speakers.
     * @param {SpeakerCreateManyArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpeakerCreateManyArgs>(args?: SelectSubset<T, SpeakerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Speakers and returns the data saved in the database.
     * @param {SpeakerCreateManyAndReturnArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpeakerCreateManyAndReturnArgs>(args?: SelectSubset<T, SpeakerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Speaker.
     * @param {SpeakerDeleteArgs} args - Arguments to delete one Speaker.
     * @example
     * // Delete one Speaker
     * const Speaker = await prisma.speaker.delete({
     *   where: {
     *     // ... filter to delete one Speaker
     *   }
     * })
     * 
     */
    delete<T extends SpeakerDeleteArgs>(args: SelectSubset<T, SpeakerDeleteArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Speaker.
     * @param {SpeakerUpdateArgs} args - Arguments to update one Speaker.
     * @example
     * // Update one Speaker
     * const speaker = await prisma.speaker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpeakerUpdateArgs>(args: SelectSubset<T, SpeakerUpdateArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Speakers.
     * @param {SpeakerDeleteManyArgs} args - Arguments to filter Speakers to delete.
     * @example
     * // Delete a few Speakers
     * const { count } = await prisma.speaker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpeakerDeleteManyArgs>(args?: SelectSubset<T, SpeakerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpeakerUpdateManyArgs>(args: SelectSubset<T, SpeakerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers and returns the data updated in the database.
     * @param {SpeakerUpdateManyAndReturnArgs} args - Arguments to update many Speakers.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpeakerUpdateManyAndReturnArgs>(args: SelectSubset<T, SpeakerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Speaker.
     * @param {SpeakerUpsertArgs} args - Arguments to update or create a Speaker.
     * @example
     * // Update or create a Speaker
     * const speaker = await prisma.speaker.upsert({
     *   create: {
     *     // ... data to create a Speaker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Speaker we want to update
     *   }
     * })
     */
    upsert<T extends SpeakerUpsertArgs>(args: SelectSubset<T, SpeakerUpsertArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerCountArgs} args - Arguments to filter Speakers to count.
     * @example
     * // Count the number of Speakers
     * const count = await prisma.speaker.count({
     *   where: {
     *     // ... the filter for the Speakers we want to count
     *   }
     * })
    **/
    count<T extends SpeakerCountArgs>(
      args?: Subset<T, SpeakerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpeakerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpeakerAggregateArgs>(args: Subset<T, SpeakerAggregateArgs>): Prisma.PrismaPromise<GetSpeakerAggregateType<T>>

    /**
     * Group by Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpeakerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpeakerGroupByArgs['orderBy'] }
        : { orderBy?: SpeakerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpeakerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpeakerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Speaker model
   */
  readonly fields: SpeakerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Speaker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpeakerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Speaker model
   */
  interface SpeakerFieldRefs {
    readonly id: FieldRef<"Speaker", 'String'>
    readonly name: FieldRef<"Speaker", 'String'>
    readonly price: FieldRef<"Speaker", 'Int'>
    readonly image: FieldRef<"Speaker", 'String[]'>
    readonly description: FieldRef<"Speaker", 'String'>
    readonly rating: FieldRef<"Speaker", 'Float'>
    readonly reviews: FieldRef<"Speaker", 'Int'>
    readonly condition: FieldRef<"Speaker", 'Condition'>
    readonly brand: FieldRef<"Speaker", 'SpeakerBrand'>
    readonly batteryLife: FieldRef<"Speaker", 'String'>
    readonly createdAt: FieldRef<"Speaker", 'DateTime'>
    readonly updatedAt: FieldRef<"Speaker", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Speaker findUnique
   */
  export type SpeakerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker findUniqueOrThrow
   */
  export type SpeakerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker findFirst
   */
  export type SpeakerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker findFirstOrThrow
   */
  export type SpeakerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker findMany
   */
  export type SpeakerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter, which Speakers to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker create
   */
  export type SpeakerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data needed to create a Speaker.
     */
    data: XOR<SpeakerCreateInput, SpeakerUncheckedCreateInput>
  }

  /**
   * Speaker createMany
   */
  export type SpeakerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Speakers.
     */
    data: SpeakerCreateManyInput | SpeakerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Speaker createManyAndReturn
   */
  export type SpeakerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data used to create many Speakers.
     */
    data: SpeakerCreateManyInput | SpeakerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Speaker update
   */
  export type SpeakerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data needed to update a Speaker.
     */
    data: XOR<SpeakerUpdateInput, SpeakerUncheckedUpdateInput>
    /**
     * Choose, which Speaker to update.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker updateMany
   */
  export type SpeakerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Speakers.
     */
    data: XOR<SpeakerUpdateManyMutationInput, SpeakerUncheckedUpdateManyInput>
    /**
     * Filter which Speakers to update
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to update.
     */
    limit?: number
  }

  /**
   * Speaker updateManyAndReturn
   */
  export type SpeakerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data used to update Speakers.
     */
    data: XOR<SpeakerUpdateManyMutationInput, SpeakerUncheckedUpdateManyInput>
    /**
     * Filter which Speakers to update
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to update.
     */
    limit?: number
  }

  /**
   * Speaker upsert
   */
  export type SpeakerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The filter to search for the Speaker to update in case it exists.
     */
    where: SpeakerWhereUniqueInput
    /**
     * In case the Speaker found by the `where` argument doesn't exist, create a new Speaker with this data.
     */
    create: XOR<SpeakerCreateInput, SpeakerUncheckedCreateInput>
    /**
     * In case the Speaker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpeakerUpdateInput, SpeakerUncheckedUpdateInput>
  }

  /**
   * Speaker delete
   */
  export type SpeakerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Filter which Speaker to delete.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker deleteMany
   */
  export type SpeakerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Speakers to delete
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to delete.
     */
    limit?: number
  }

  /**
   * Speaker without action
   */
  export type SpeakerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
  }


  /**
   * Model Accessory
   */

  export type AggregateAccessory = {
    _count: AccessoryCountAggregateOutputType | null
    _avg: AccessoryAvgAggregateOutputType | null
    _sum: AccessorySumAggregateOutputType | null
    _min: AccessoryMinAggregateOutputType | null
    _max: AccessoryMaxAggregateOutputType | null
  }

  export type AccessoryAvgAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type AccessorySumAggregateOutputType = {
    price: number | null
    rating: number | null
    reviews: number | null
  }

  export type AccessoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    condition: $Enums.Condition | null
    brand: $Enums.AccessoryBrand | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    description: string | null
    rating: number | null
    reviews: number | null
    condition: $Enums.Condition | null
    brand: $Enums.AccessoryBrand | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessoryCountAggregateOutputType = {
    id: number
    name: number
    price: number
    image: number
    description: number
    rating: number
    reviews: number
    condition: number
    brand: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccessoryAvgAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type AccessorySumAggregateInputType = {
    price?: true
    rating?: true
    reviews?: true
  }

  export type AccessoryMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessoryMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessoryCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    image?: true
    description?: true
    rating?: true
    reviews?: true
    condition?: true
    brand?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccessoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accessory to aggregate.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accessories
    **/
    _count?: true | AccessoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessoryMaxAggregateInputType
  }

  export type GetAccessoryAggregateType<T extends AccessoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessory[P]>
      : GetScalarType<T[P], AggregateAccessory[P]>
  }




  export type AccessoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessoryWhereInput
    orderBy?: AccessoryOrderByWithAggregationInput | AccessoryOrderByWithAggregationInput[]
    by: AccessoryScalarFieldEnum[] | AccessoryScalarFieldEnum
    having?: AccessoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessoryCountAggregateInputType | true
    _avg?: AccessoryAvgAggregateInputType
    _sum?: AccessorySumAggregateInputType
    _min?: AccessoryMinAggregateInputType
    _max?: AccessoryMaxAggregateInputType
  }

  export type AccessoryGroupByOutputType = {
    id: string
    name: string
    price: number
    image: string[]
    description: string | null
    rating: number
    reviews: number
    condition: $Enums.Condition
    brand: $Enums.AccessoryBrand
    type: string
    createdAt: Date
    updatedAt: Date
    _count: AccessoryCountAggregateOutputType | null
    _avg: AccessoryAvgAggregateOutputType | null
    _sum: AccessorySumAggregateOutputType | null
    _min: AccessoryMinAggregateOutputType | null
    _max: AccessoryMaxAggregateOutputType | null
  }

  type GetAccessoryGroupByPayload<T extends AccessoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessoryGroupByOutputType[P]>
            : GetScalarType<T[P], AccessoryGroupByOutputType[P]>
        }
      >
    >


  export type AccessorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["accessory"]>

  export type AccessorySelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    image?: boolean
    description?: boolean
    rating?: boolean
    reviews?: boolean
    condition?: boolean
    brand?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccessoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "image" | "description" | "rating" | "reviews" | "condition" | "brand" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["accessory"]>

  export type $AccessoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Accessory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      image: string[]
      description: string | null
      rating: number
      reviews: number
      condition: $Enums.Condition
      brand: $Enums.AccessoryBrand
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["accessory"]>
    composites: {}
  }

  type AccessoryGetPayload<S extends boolean | null | undefined | AccessoryDefaultArgs> = $Result.GetResult<Prisma.$AccessoryPayload, S>

  type AccessoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessoryCountAggregateInputType | true
    }

  export interface AccessoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Accessory'], meta: { name: 'Accessory' } }
    /**
     * Find zero or one Accessory that matches the filter.
     * @param {AccessoryFindUniqueArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessoryFindUniqueArgs>(args: SelectSubset<T, AccessoryFindUniqueArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Accessory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessoryFindUniqueOrThrowArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accessory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindFirstArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessoryFindFirstArgs>(args?: SelectSubset<T, AccessoryFindFirstArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accessory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindFirstOrThrowArgs} args - Arguments to find a Accessory
     * @example
     * // Get one Accessory
     * const accessory = await prisma.accessory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accessories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accessories
     * const accessories = await prisma.accessory.findMany()
     * 
     * // Get first 10 Accessories
     * const accessories = await prisma.accessory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessoryWithIdOnly = await prisma.accessory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessoryFindManyArgs>(args?: SelectSubset<T, AccessoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Accessory.
     * @param {AccessoryCreateArgs} args - Arguments to create a Accessory.
     * @example
     * // Create one Accessory
     * const Accessory = await prisma.accessory.create({
     *   data: {
     *     // ... data to create a Accessory
     *   }
     * })
     * 
     */
    create<T extends AccessoryCreateArgs>(args: SelectSubset<T, AccessoryCreateArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accessories.
     * @param {AccessoryCreateManyArgs} args - Arguments to create many Accessories.
     * @example
     * // Create many Accessories
     * const accessory = await prisma.accessory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessoryCreateManyArgs>(args?: SelectSubset<T, AccessoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accessories and returns the data saved in the database.
     * @param {AccessoryCreateManyAndReturnArgs} args - Arguments to create many Accessories.
     * @example
     * // Create many Accessories
     * const accessory = await prisma.accessory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accessories and only return the `id`
     * const accessoryWithIdOnly = await prisma.accessory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Accessory.
     * @param {AccessoryDeleteArgs} args - Arguments to delete one Accessory.
     * @example
     * // Delete one Accessory
     * const Accessory = await prisma.accessory.delete({
     *   where: {
     *     // ... filter to delete one Accessory
     *   }
     * })
     * 
     */
    delete<T extends AccessoryDeleteArgs>(args: SelectSubset<T, AccessoryDeleteArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Accessory.
     * @param {AccessoryUpdateArgs} args - Arguments to update one Accessory.
     * @example
     * // Update one Accessory
     * const accessory = await prisma.accessory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessoryUpdateArgs>(args: SelectSubset<T, AccessoryUpdateArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accessories.
     * @param {AccessoryDeleteManyArgs} args - Arguments to filter Accessories to delete.
     * @example
     * // Delete a few Accessories
     * const { count } = await prisma.accessory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessoryDeleteManyArgs>(args?: SelectSubset<T, AccessoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accessories
     * const accessory = await prisma.accessory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessoryUpdateManyArgs>(args: SelectSubset<T, AccessoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accessories and returns the data updated in the database.
     * @param {AccessoryUpdateManyAndReturnArgs} args - Arguments to update many Accessories.
     * @example
     * // Update many Accessories
     * const accessory = await prisma.accessory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accessories and only return the `id`
     * const accessoryWithIdOnly = await prisma.accessory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Accessory.
     * @param {AccessoryUpsertArgs} args - Arguments to update or create a Accessory.
     * @example
     * // Update or create a Accessory
     * const accessory = await prisma.accessory.upsert({
     *   create: {
     *     // ... data to create a Accessory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Accessory we want to update
     *   }
     * })
     */
    upsert<T extends AccessoryUpsertArgs>(args: SelectSubset<T, AccessoryUpsertArgs<ExtArgs>>): Prisma__AccessoryClient<$Result.GetResult<Prisma.$AccessoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accessories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryCountArgs} args - Arguments to filter Accessories to count.
     * @example
     * // Count the number of Accessories
     * const count = await prisma.accessory.count({
     *   where: {
     *     // ... the filter for the Accessories we want to count
     *   }
     * })
    **/
    count<T extends AccessoryCountArgs>(
      args?: Subset<T, AccessoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Accessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessoryAggregateArgs>(args: Subset<T, AccessoryAggregateArgs>): Prisma.PrismaPromise<GetAccessoryAggregateType<T>>

    /**
     * Group by Accessory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessoryGroupByArgs['orderBy'] }
        : { orderBy?: AccessoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Accessory model
   */
  readonly fields: AccessoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Accessory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Accessory model
   */
  interface AccessoryFieldRefs {
    readonly id: FieldRef<"Accessory", 'String'>
    readonly name: FieldRef<"Accessory", 'String'>
    readonly price: FieldRef<"Accessory", 'Int'>
    readonly image: FieldRef<"Accessory", 'String[]'>
    readonly description: FieldRef<"Accessory", 'String'>
    readonly rating: FieldRef<"Accessory", 'Float'>
    readonly reviews: FieldRef<"Accessory", 'Int'>
    readonly condition: FieldRef<"Accessory", 'Condition'>
    readonly brand: FieldRef<"Accessory", 'AccessoryBrand'>
    readonly type: FieldRef<"Accessory", 'String'>
    readonly createdAt: FieldRef<"Accessory", 'DateTime'>
    readonly updatedAt: FieldRef<"Accessory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Accessory findUnique
   */
  export type AccessoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory findUniqueOrThrow
   */
  export type AccessoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory findFirst
   */
  export type AccessoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accessories.
     */
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory findFirstOrThrow
   */
  export type AccessoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter, which Accessory to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accessories.
     */
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory findMany
   */
  export type AccessoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter, which Accessories to fetch.
     */
    where?: AccessoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accessories to fetch.
     */
    orderBy?: AccessoryOrderByWithRelationInput | AccessoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accessories.
     */
    cursor?: AccessoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accessories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accessories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accessories.
     */
    distinct?: AccessoryScalarFieldEnum | AccessoryScalarFieldEnum[]
  }

  /**
   * Accessory create
   */
  export type AccessoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data needed to create a Accessory.
     */
    data: XOR<AccessoryCreateInput, AccessoryUncheckedCreateInput>
  }

  /**
   * Accessory createMany
   */
  export type AccessoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accessories.
     */
    data: AccessoryCreateManyInput | AccessoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Accessory createManyAndReturn
   */
  export type AccessoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data used to create many Accessories.
     */
    data: AccessoryCreateManyInput | AccessoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Accessory update
   */
  export type AccessoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data needed to update a Accessory.
     */
    data: XOR<AccessoryUpdateInput, AccessoryUncheckedUpdateInput>
    /**
     * Choose, which Accessory to update.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory updateMany
   */
  export type AccessoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accessories.
     */
    data: XOR<AccessoryUpdateManyMutationInput, AccessoryUncheckedUpdateManyInput>
    /**
     * Filter which Accessories to update
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to update.
     */
    limit?: number
  }

  /**
   * Accessory updateManyAndReturn
   */
  export type AccessoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The data used to update Accessories.
     */
    data: XOR<AccessoryUpdateManyMutationInput, AccessoryUncheckedUpdateManyInput>
    /**
     * Filter which Accessories to update
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to update.
     */
    limit?: number
  }

  /**
   * Accessory upsert
   */
  export type AccessoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * The filter to search for the Accessory to update in case it exists.
     */
    where: AccessoryWhereUniqueInput
    /**
     * In case the Accessory found by the `where` argument doesn't exist, create a new Accessory with this data.
     */
    create: XOR<AccessoryCreateInput, AccessoryUncheckedCreateInput>
    /**
     * In case the Accessory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessoryUpdateInput, AccessoryUncheckedUpdateInput>
  }

  /**
   * Accessory delete
   */
  export type AccessoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
    /**
     * Filter which Accessory to delete.
     */
    where: AccessoryWhereUniqueInput
  }

  /**
   * Accessory deleteMany
   */
  export type AccessoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accessories to delete
     */
    where?: AccessoryWhereInput
    /**
     * Limit how many Accessories to delete.
     */
    limit?: number
  }

  /**
   * Accessory without action
   */
  export type AccessoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accessory
     */
    select?: AccessorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accessory
     */
    omit?: AccessoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SmartphoneScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    image: 'image',
    description: 'description',
    rating: 'rating',
    reviews: 'reviews',
    storage: 'storage',
    condition: 'condition',
    brand: 'brand',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SmartphoneScalarFieldEnum = (typeof SmartphoneScalarFieldEnum)[keyof typeof SmartphoneScalarFieldEnum]


  export const SpeakerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    image: 'image',
    description: 'description',
    rating: 'rating',
    reviews: 'reviews',
    condition: 'condition',
    brand: 'brand',
    batteryLife: 'batteryLife',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpeakerScalarFieldEnum = (typeof SpeakerScalarFieldEnum)[keyof typeof SpeakerScalarFieldEnum]


  export const AccessoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    image: 'image',
    description: 'description',
    rating: 'rating',
    reviews: 'reviews',
    condition: 'condition',
    brand: 'brand',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccessoryScalarFieldEnum = (typeof AccessoryScalarFieldEnum)[keyof typeof AccessoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StorageCapacity'
   */
  export type EnumStorageCapacityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StorageCapacity'>
    


  /**
   * Reference to a field of type 'StorageCapacity[]'
   */
  export type ListEnumStorageCapacityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StorageCapacity[]'>
    


  /**
   * Reference to a field of type 'Condition'
   */
  export type EnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Condition'>
    


  /**
   * Reference to a field of type 'Condition[]'
   */
  export type ListEnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Condition[]'>
    


  /**
   * Reference to a field of type 'SmartphoneBrand'
   */
  export type EnumSmartphoneBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SmartphoneBrand'>
    


  /**
   * Reference to a field of type 'SmartphoneBrand[]'
   */
  export type ListEnumSmartphoneBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SmartphoneBrand[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SpeakerBrand'
   */
  export type EnumSpeakerBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpeakerBrand'>
    


  /**
   * Reference to a field of type 'SpeakerBrand[]'
   */
  export type ListEnumSpeakerBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpeakerBrand[]'>
    


  /**
   * Reference to a field of type 'AccessoryBrand'
   */
  export type EnumAccessoryBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessoryBrand'>
    


  /**
   * Reference to a field of type 'AccessoryBrand[]'
   */
  export type ListEnumAccessoryBrandFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessoryBrand[]'>
    
  /**
   * Deep Input Types
   */


  export type SmartphoneWhereInput = {
    AND?: SmartphoneWhereInput | SmartphoneWhereInput[]
    OR?: SmartphoneWhereInput[]
    NOT?: SmartphoneWhereInput | SmartphoneWhereInput[]
    id?: StringFilter<"Smartphone"> | string
    name?: StringFilter<"Smartphone"> | string
    price?: IntFilter<"Smartphone"> | number
    image?: StringNullableListFilter<"Smartphone">
    description?: StringNullableFilter<"Smartphone"> | string | null
    rating?: FloatFilter<"Smartphone"> | number
    reviews?: IntFilter<"Smartphone"> | number
    storage?: EnumStorageCapacityFilter<"Smartphone"> | $Enums.StorageCapacity
    condition?: EnumConditionFilter<"Smartphone"> | $Enums.Condition
    brand?: EnumSmartphoneBrandFilter<"Smartphone"> | $Enums.SmartphoneBrand
    createdAt?: DateTimeFilter<"Smartphone"> | Date | string
    updatedAt?: DateTimeFilter<"Smartphone"> | Date | string
  }

  export type SmartphoneOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    storage?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmartphoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SmartphoneWhereInput | SmartphoneWhereInput[]
    OR?: SmartphoneWhereInput[]
    NOT?: SmartphoneWhereInput | SmartphoneWhereInput[]
    name?: StringFilter<"Smartphone"> | string
    price?: IntFilter<"Smartphone"> | number
    image?: StringNullableListFilter<"Smartphone">
    description?: StringNullableFilter<"Smartphone"> | string | null
    rating?: FloatFilter<"Smartphone"> | number
    reviews?: IntFilter<"Smartphone"> | number
    storage?: EnumStorageCapacityFilter<"Smartphone"> | $Enums.StorageCapacity
    condition?: EnumConditionFilter<"Smartphone"> | $Enums.Condition
    brand?: EnumSmartphoneBrandFilter<"Smartphone"> | $Enums.SmartphoneBrand
    createdAt?: DateTimeFilter<"Smartphone"> | Date | string
    updatedAt?: DateTimeFilter<"Smartphone"> | Date | string
  }, "id">

  export type SmartphoneOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    storage?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SmartphoneCountOrderByAggregateInput
    _avg?: SmartphoneAvgOrderByAggregateInput
    _max?: SmartphoneMaxOrderByAggregateInput
    _min?: SmartphoneMinOrderByAggregateInput
    _sum?: SmartphoneSumOrderByAggregateInput
  }

  export type SmartphoneScalarWhereWithAggregatesInput = {
    AND?: SmartphoneScalarWhereWithAggregatesInput | SmartphoneScalarWhereWithAggregatesInput[]
    OR?: SmartphoneScalarWhereWithAggregatesInput[]
    NOT?: SmartphoneScalarWhereWithAggregatesInput | SmartphoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Smartphone"> | string
    name?: StringWithAggregatesFilter<"Smartphone"> | string
    price?: IntWithAggregatesFilter<"Smartphone"> | number
    image?: StringNullableListFilter<"Smartphone">
    description?: StringNullableWithAggregatesFilter<"Smartphone"> | string | null
    rating?: FloatWithAggregatesFilter<"Smartphone"> | number
    reviews?: IntWithAggregatesFilter<"Smartphone"> | number
    storage?: EnumStorageCapacityWithAggregatesFilter<"Smartphone"> | $Enums.StorageCapacity
    condition?: EnumConditionWithAggregatesFilter<"Smartphone"> | $Enums.Condition
    brand?: EnumSmartphoneBrandWithAggregatesFilter<"Smartphone"> | $Enums.SmartphoneBrand
    createdAt?: DateTimeWithAggregatesFilter<"Smartphone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Smartphone"> | Date | string
  }

  export type SpeakerWhereInput = {
    AND?: SpeakerWhereInput | SpeakerWhereInput[]
    OR?: SpeakerWhereInput[]
    NOT?: SpeakerWhereInput | SpeakerWhereInput[]
    id?: StringFilter<"Speaker"> | string
    name?: StringFilter<"Speaker"> | string
    price?: IntFilter<"Speaker"> | number
    image?: StringNullableListFilter<"Speaker">
    description?: StringNullableFilter<"Speaker"> | string | null
    rating?: FloatFilter<"Speaker"> | number
    reviews?: IntFilter<"Speaker"> | number
    condition?: EnumConditionFilter<"Speaker"> | $Enums.Condition
    brand?: EnumSpeakerBrandFilter<"Speaker"> | $Enums.SpeakerBrand
    batteryLife?: StringNullableFilter<"Speaker"> | string | null
    createdAt?: DateTimeFilter<"Speaker"> | Date | string
    updatedAt?: DateTimeFilter<"Speaker"> | Date | string
  }

  export type SpeakerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    batteryLife?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeakerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpeakerWhereInput | SpeakerWhereInput[]
    OR?: SpeakerWhereInput[]
    NOT?: SpeakerWhereInput | SpeakerWhereInput[]
    name?: StringFilter<"Speaker"> | string
    price?: IntFilter<"Speaker"> | number
    image?: StringNullableListFilter<"Speaker">
    description?: StringNullableFilter<"Speaker"> | string | null
    rating?: FloatFilter<"Speaker"> | number
    reviews?: IntFilter<"Speaker"> | number
    condition?: EnumConditionFilter<"Speaker"> | $Enums.Condition
    brand?: EnumSpeakerBrandFilter<"Speaker"> | $Enums.SpeakerBrand
    batteryLife?: StringNullableFilter<"Speaker"> | string | null
    createdAt?: DateTimeFilter<"Speaker"> | Date | string
    updatedAt?: DateTimeFilter<"Speaker"> | Date | string
  }, "id">

  export type SpeakerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    batteryLife?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpeakerCountOrderByAggregateInput
    _avg?: SpeakerAvgOrderByAggregateInput
    _max?: SpeakerMaxOrderByAggregateInput
    _min?: SpeakerMinOrderByAggregateInput
    _sum?: SpeakerSumOrderByAggregateInput
  }

  export type SpeakerScalarWhereWithAggregatesInput = {
    AND?: SpeakerScalarWhereWithAggregatesInput | SpeakerScalarWhereWithAggregatesInput[]
    OR?: SpeakerScalarWhereWithAggregatesInput[]
    NOT?: SpeakerScalarWhereWithAggregatesInput | SpeakerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Speaker"> | string
    name?: StringWithAggregatesFilter<"Speaker"> | string
    price?: IntWithAggregatesFilter<"Speaker"> | number
    image?: StringNullableListFilter<"Speaker">
    description?: StringNullableWithAggregatesFilter<"Speaker"> | string | null
    rating?: FloatWithAggregatesFilter<"Speaker"> | number
    reviews?: IntWithAggregatesFilter<"Speaker"> | number
    condition?: EnumConditionWithAggregatesFilter<"Speaker"> | $Enums.Condition
    brand?: EnumSpeakerBrandWithAggregatesFilter<"Speaker"> | $Enums.SpeakerBrand
    batteryLife?: StringNullableWithAggregatesFilter<"Speaker"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Speaker"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Speaker"> | Date | string
  }

  export type AccessoryWhereInput = {
    AND?: AccessoryWhereInput | AccessoryWhereInput[]
    OR?: AccessoryWhereInput[]
    NOT?: AccessoryWhereInput | AccessoryWhereInput[]
    id?: StringFilter<"Accessory"> | string
    name?: StringFilter<"Accessory"> | string
    price?: IntFilter<"Accessory"> | number
    image?: StringNullableListFilter<"Accessory">
    description?: StringNullableFilter<"Accessory"> | string | null
    rating?: FloatFilter<"Accessory"> | number
    reviews?: IntFilter<"Accessory"> | number
    condition?: EnumConditionFilter<"Accessory"> | $Enums.Condition
    brand?: EnumAccessoryBrandFilter<"Accessory"> | $Enums.AccessoryBrand
    type?: StringFilter<"Accessory"> | string
    createdAt?: DateTimeFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeFilter<"Accessory"> | Date | string
  }

  export type AccessoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccessoryWhereInput | AccessoryWhereInput[]
    OR?: AccessoryWhereInput[]
    NOT?: AccessoryWhereInput | AccessoryWhereInput[]
    name?: StringFilter<"Accessory"> | string
    price?: IntFilter<"Accessory"> | number
    image?: StringNullableListFilter<"Accessory">
    description?: StringNullableFilter<"Accessory"> | string | null
    rating?: FloatFilter<"Accessory"> | number
    reviews?: IntFilter<"Accessory"> | number
    condition?: EnumConditionFilter<"Accessory"> | $Enums.Condition
    brand?: EnumAccessoryBrandFilter<"Accessory"> | $Enums.AccessoryBrand
    type?: StringFilter<"Accessory"> | string
    createdAt?: DateTimeFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeFilter<"Accessory"> | Date | string
  }, "id">

  export type AccessoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccessoryCountOrderByAggregateInput
    _avg?: AccessoryAvgOrderByAggregateInput
    _max?: AccessoryMaxOrderByAggregateInput
    _min?: AccessoryMinOrderByAggregateInput
    _sum?: AccessorySumOrderByAggregateInput
  }

  export type AccessoryScalarWhereWithAggregatesInput = {
    AND?: AccessoryScalarWhereWithAggregatesInput | AccessoryScalarWhereWithAggregatesInput[]
    OR?: AccessoryScalarWhereWithAggregatesInput[]
    NOT?: AccessoryScalarWhereWithAggregatesInput | AccessoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Accessory"> | string
    name?: StringWithAggregatesFilter<"Accessory"> | string
    price?: IntWithAggregatesFilter<"Accessory"> | number
    image?: StringNullableListFilter<"Accessory">
    description?: StringNullableWithAggregatesFilter<"Accessory"> | string | null
    rating?: FloatWithAggregatesFilter<"Accessory"> | number
    reviews?: IntWithAggregatesFilter<"Accessory"> | number
    condition?: EnumConditionWithAggregatesFilter<"Accessory"> | $Enums.Condition
    brand?: EnumAccessoryBrandWithAggregatesFilter<"Accessory"> | $Enums.AccessoryBrand
    type?: StringWithAggregatesFilter<"Accessory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Accessory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Accessory"> | Date | string
  }

  export type SmartphoneCreateInput = {
    id?: string
    name: string
    price: number
    image?: SmartphoneCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    storage: $Enums.StorageCapacity
    condition: $Enums.Condition
    brand: $Enums.SmartphoneBrand
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmartphoneUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    image?: SmartphoneCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    storage: $Enums.StorageCapacity
    condition: $Enums.Condition
    brand: $Enums.SmartphoneBrand
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmartphoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SmartphoneUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    storage?: EnumStorageCapacityFieldUpdateOperationsInput | $Enums.StorageCapacity
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSmartphoneBrandFieldUpdateOperationsInput | $Enums.SmartphoneBrand
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmartphoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SmartphoneUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    storage?: EnumStorageCapacityFieldUpdateOperationsInput | $Enums.StorageCapacity
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSmartphoneBrandFieldUpdateOperationsInput | $Enums.SmartphoneBrand
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmartphoneCreateManyInput = {
    id?: string
    name: string
    price: number
    image?: SmartphoneCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    storage: $Enums.StorageCapacity
    condition: $Enums.Condition
    brand: $Enums.SmartphoneBrand
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmartphoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SmartphoneUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    storage?: EnumStorageCapacityFieldUpdateOperationsInput | $Enums.StorageCapacity
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSmartphoneBrandFieldUpdateOperationsInput | $Enums.SmartphoneBrand
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmartphoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SmartphoneUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    storage?: EnumStorageCapacityFieldUpdateOperationsInput | $Enums.StorageCapacity
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSmartphoneBrandFieldUpdateOperationsInput | $Enums.SmartphoneBrand
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeakerCreateInput = {
    id?: string
    name: string
    price: number
    image?: SpeakerCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.SpeakerBrand
    batteryLife?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeakerUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    image?: SpeakerCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.SpeakerBrand
    batteryLife?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeakerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SpeakerUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSpeakerBrandFieldUpdateOperationsInput | $Enums.SpeakerBrand
    batteryLife?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeakerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SpeakerUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSpeakerBrandFieldUpdateOperationsInput | $Enums.SpeakerBrand
    batteryLife?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeakerCreateManyInput = {
    id?: string
    name: string
    price: number
    image?: SpeakerCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.SpeakerBrand
    batteryLife?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpeakerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SpeakerUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSpeakerBrandFieldUpdateOperationsInput | $Enums.SpeakerBrand
    batteryLife?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpeakerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: SpeakerUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumSpeakerBrandFieldUpdateOperationsInput | $Enums.SpeakerBrand
    batteryLife?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryCreateInput = {
    id?: string
    name: string
    price: number
    image?: AccessoryCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.AccessoryBrand
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    image?: AccessoryCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.AccessoryBrand
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: AccessoryUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumAccessoryBrandFieldUpdateOperationsInput | $Enums.AccessoryBrand
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: AccessoryUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumAccessoryBrandFieldUpdateOperationsInput | $Enums.AccessoryBrand
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryCreateManyInput = {
    id?: string
    name: string
    price: number
    image?: AccessoryCreateimageInput | string[]
    description?: string | null
    rating?: number
    reviews?: number
    condition: $Enums.Condition
    brand: $Enums.AccessoryBrand
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: AccessoryUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumAccessoryBrandFieldUpdateOperationsInput | $Enums.AccessoryBrand
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    image?: AccessoryUpdateimageInput | string[]
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    brand?: EnumAccessoryBrandFieldUpdateOperationsInput | $Enums.AccessoryBrand
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumStorageCapacityFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageCapacity | EnumStorageCapacityFieldRefInput<$PrismaModel>
    in?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageCapacityFilter<$PrismaModel> | $Enums.StorageCapacity
  }

  export type EnumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition
  }

  export type EnumSmartphoneBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.SmartphoneBrand | EnumSmartphoneBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSmartphoneBrandFilter<$PrismaModel> | $Enums.SmartphoneBrand
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SmartphoneCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    storage?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmartphoneAvgOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type SmartphoneMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    storage?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmartphoneMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    storage?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmartphoneSumOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumStorageCapacityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageCapacity | EnumStorageCapacityFieldRefInput<$PrismaModel>
    in?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageCapacityWithAggregatesFilter<$PrismaModel> | $Enums.StorageCapacity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStorageCapacityFilter<$PrismaModel>
    _max?: NestedEnumStorageCapacityFilter<$PrismaModel>
  }

  export type EnumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConditionFilter<$PrismaModel>
    _max?: NestedEnumConditionFilter<$PrismaModel>
  }

  export type EnumSmartphoneBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SmartphoneBrand | EnumSmartphoneBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSmartphoneBrandWithAggregatesFilter<$PrismaModel> | $Enums.SmartphoneBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSmartphoneBrandFilter<$PrismaModel>
    _max?: NestedEnumSmartphoneBrandFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSpeakerBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.SpeakerBrand | EnumSpeakerBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerBrandFilter<$PrismaModel> | $Enums.SpeakerBrand
  }

  export type SpeakerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    batteryLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeakerAvgOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type SpeakerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    batteryLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeakerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    batteryLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpeakerSumOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type EnumSpeakerBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpeakerBrand | EnumSpeakerBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerBrandWithAggregatesFilter<$PrismaModel> | $Enums.SpeakerBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerBrandFilter<$PrismaModel>
    _max?: NestedEnumSpeakerBrandFilter<$PrismaModel>
  }

  export type EnumAccessoryBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessoryBrand | EnumAccessoryBrandFieldRefInput<$PrismaModel>
    in?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumAccessoryBrandFilter<$PrismaModel> | $Enums.AccessoryBrand
  }

  export type AccessoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    image?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessoryAvgOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type AccessoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    condition?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessorySumOrderByAggregateInput = {
    price?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
  }

  export type EnumAccessoryBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessoryBrand | EnumAccessoryBrandFieldRefInput<$PrismaModel>
    in?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumAccessoryBrandWithAggregatesFilter<$PrismaModel> | $Enums.AccessoryBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccessoryBrandFilter<$PrismaModel>
    _max?: NestedEnumAccessoryBrandFilter<$PrismaModel>
  }

  export type SmartphoneCreateimageInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SmartphoneUpdateimageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStorageCapacityFieldUpdateOperationsInput = {
    set?: $Enums.StorageCapacity
  }

  export type EnumConditionFieldUpdateOperationsInput = {
    set?: $Enums.Condition
  }

  export type EnumSmartphoneBrandFieldUpdateOperationsInput = {
    set?: $Enums.SmartphoneBrand
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SpeakerCreateimageInput = {
    set: string[]
  }

  export type SpeakerUpdateimageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumSpeakerBrandFieldUpdateOperationsInput = {
    set?: $Enums.SpeakerBrand
  }

  export type AccessoryCreateimageInput = {
    set: string[]
  }

  export type AccessoryUpdateimageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAccessoryBrandFieldUpdateOperationsInput = {
    set?: $Enums.AccessoryBrand
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStorageCapacityFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageCapacity | EnumStorageCapacityFieldRefInput<$PrismaModel>
    in?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageCapacityFilter<$PrismaModel> | $Enums.StorageCapacity
  }

  export type NestedEnumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition
  }

  export type NestedEnumSmartphoneBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.SmartphoneBrand | EnumSmartphoneBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSmartphoneBrandFilter<$PrismaModel> | $Enums.SmartphoneBrand
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumStorageCapacityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageCapacity | EnumStorageCapacityFieldRefInput<$PrismaModel>
    in?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageCapacity[] | ListEnumStorageCapacityFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageCapacityWithAggregatesFilter<$PrismaModel> | $Enums.StorageCapacity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStorageCapacityFilter<$PrismaModel>
    _max?: NestedEnumStorageCapacityFilter<$PrismaModel>
  }

  export type NestedEnumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConditionFilter<$PrismaModel>
    _max?: NestedEnumConditionFilter<$PrismaModel>
  }

  export type NestedEnumSmartphoneBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SmartphoneBrand | EnumSmartphoneBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SmartphoneBrand[] | ListEnumSmartphoneBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSmartphoneBrandWithAggregatesFilter<$PrismaModel> | $Enums.SmartphoneBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSmartphoneBrandFilter<$PrismaModel>
    _max?: NestedEnumSmartphoneBrandFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSpeakerBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.SpeakerBrand | EnumSpeakerBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerBrandFilter<$PrismaModel> | $Enums.SpeakerBrand
  }

  export type NestedEnumSpeakerBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpeakerBrand | EnumSpeakerBrandFieldRefInput<$PrismaModel>
    in?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpeakerBrand[] | ListEnumSpeakerBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumSpeakerBrandWithAggregatesFilter<$PrismaModel> | $Enums.SpeakerBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerBrandFilter<$PrismaModel>
    _max?: NestedEnumSpeakerBrandFilter<$PrismaModel>
  }

  export type NestedEnumAccessoryBrandFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessoryBrand | EnumAccessoryBrandFieldRefInput<$PrismaModel>
    in?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumAccessoryBrandFilter<$PrismaModel> | $Enums.AccessoryBrand
  }

  export type NestedEnumAccessoryBrandWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessoryBrand | EnumAccessoryBrandFieldRefInput<$PrismaModel>
    in?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccessoryBrand[] | ListEnumAccessoryBrandFieldRefInput<$PrismaModel>
    not?: NestedEnumAccessoryBrandWithAggregatesFilter<$PrismaModel> | $Enums.AccessoryBrand
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccessoryBrandFilter<$PrismaModel>
    _max?: NestedEnumAccessoryBrandFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}