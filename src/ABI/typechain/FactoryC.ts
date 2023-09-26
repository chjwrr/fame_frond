/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface FactoryCInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "GGNPFactoryUpgradeable__init"
      | "_ALL_REGISTRY_"
      | "_DEFAULT_MAINTAINER_"
      | "_DEFAULT_MT_FEE_RATE_MODEL_"
      | "_GGNP_TEMPLATE_"
      | "_NEW_OWNER_"
      | "_OWNER_"
      | "_PAUSED_"
      | "_REGISTRY_"
      | "addPoolByAdmin"
      | "childImplementation"
      | "claimOwnership"
      | "createGASGatNPool"
      | "getAllGASPool"
      | "getGASPool"
      | "initOwner"
      | "pause"
      | "pausePools"
      | "removePoolByAdmin"
      | "transferOwnership"
      | "unpause"
      | "unpausePools"
      | "updateDefaultMaintainer"
      | "updateGGNPTemplate"
      | "upgradeChildTo"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "NewGGNP"
      | "OwnershipTransferPrepared"
      | "OwnershipTransferred"
      | "RemoveGGNP"
      | "Upgraded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "GGNPFactoryUpgradeable__init",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_ALL_REGISTRY_",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_DEFAULT_MAINTAINER_",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_DEFAULT_MT_FEE_RATE_MODEL_",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_GGNP_TEMPLATE_",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_NEW_OWNER_",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "_OWNER_", values?: undefined): string;
  encodeFunctionData(functionFragment: "_PAUSED_", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_REGISTRY_",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addPoolByAdmin",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "childImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createGASGatNPool",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllGASPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGASPool",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pausePools",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "removePoolByAdmin",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unpausePools",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultMaintainer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateGGNPTemplate",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeChildTo",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "GGNPFactoryUpgradeable__init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_ALL_REGISTRY_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_DEFAULT_MAINTAINER_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_DEFAULT_MT_FEE_RATE_MODEL_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_GGNP_TEMPLATE_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_NEW_OWNER_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_OWNER_", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_PAUSED_", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_REGISTRY_", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addPoolByAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "childImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createGASGatNPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllGASPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGASPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pausePools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removePoolByAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unpausePools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultMaintainer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateGGNPTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeChildTo",
    data: BytesLike
  ): Result;
}

export namespace NewGGNPEvent {
  export type InputTuple = [
    baseToken: AddressLike,
    quoteToken: AddressLike,
    GGNP: AddressLike
  ];
  export type OutputTuple = [
    baseToken: string,
    quoteToken: string,
    GGNP: string
  ];
  export interface OutputObject {
    baseToken: string;
    quoteToken: string;
    GGNP: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferPreparedEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RemoveGGNPEvent {
  export type InputTuple = [GGNP: AddressLike];
  export type OutputTuple = [GGNP: string];
  export interface OutputObject {
    GGNP: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FactoryC extends BaseContract {
  connect(runner?: ContractRunner | null): FactoryC;
  waitForDeployment(): Promise<this>;

  interface: FactoryCInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  GGNPFactoryUpgradeable__init: TypedContractMethod<
    [
      gGNPTemplate: AddressLike,
      defaultMaintainer: AddressLike,
      defaultMtFeeRateModel: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  _ALL_REGISTRY_: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  _DEFAULT_MAINTAINER_: TypedContractMethod<[], [string], "view">;

  _DEFAULT_MT_FEE_RATE_MODEL_: TypedContractMethod<[], [string], "view">;

  _GGNP_TEMPLATE_: TypedContractMethod<[], [string], "view">;

  _NEW_OWNER_: TypedContractMethod<[], [string], "view">;

  _OWNER_: TypedContractMethod<[], [string], "view">;

  _PAUSED_: TypedContractMethod<[], [boolean], "view">;

  _REGISTRY_: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [string],
    "view"
  >;

  addPoolByAdmin: TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike, pool: AddressLike],
    [void],
    "nonpayable"
  >;

  childImplementation: TypedContractMethod<[], [string], "view">;

  claimOwnership: TypedContractMethod<[], [void], "nonpayable">;

  createGASGatNPool: TypedContractMethod<
    [
      owner: AddressLike,
      baseToken: AddressLike,
      quoteToken: AddressLike,
      oracle: AddressLike,
      lpFeeRate: BigNumberish,
      kb: BigNumberish,
      kq: BigNumberish,
      isOpenTWAP: boolean
    ],
    [string],
    "nonpayable"
  >;

  getAllGASPool: TypedContractMethod<[], [string[]], "view">;

  getGASPool: TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike],
    [string[]],
    "view"
  >;

  initOwner: TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  pausePools: TypedContractMethod<
    [_poolIds: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  removePoolByAdmin: TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike, pool: AddressLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  unpausePools: TypedContractMethod<
    [_poolIds: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  updateDefaultMaintainer: TypedContractMethod<
    [_newMaintainer: AddressLike],
    [void],
    "nonpayable"
  >;

  updateGGNPTemplate: TypedContractMethod<
    [_newGGNPTemplate: AddressLike],
    [void],
    "nonpayable"
  >;

  upgradeChildTo: TypedContractMethod<
    [newChildImplementation: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "GGNPFactoryUpgradeable__init"
  ): TypedContractMethod<
    [
      gGNPTemplate: AddressLike,
      defaultMaintainer: AddressLike,
      defaultMtFeeRateModel: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "_ALL_REGISTRY_"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "_DEFAULT_MAINTAINER_"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_DEFAULT_MT_FEE_RATE_MODEL_"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_GGNP_TEMPLATE_"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_NEW_OWNER_"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_OWNER_"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_PAUSED_"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "_REGISTRY_"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "addPoolByAdmin"
  ): TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike, pool: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "childImplementation"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "claimOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createGASGatNPool"
  ): TypedContractMethod<
    [
      owner: AddressLike,
      baseToken: AddressLike,
      quoteToken: AddressLike,
      oracle: AddressLike,
      lpFeeRate: BigNumberish,
      kb: BigNumberish,
      kq: BigNumberish,
      isOpenTWAP: boolean
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAllGASPool"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getGASPool"
  ): TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike],
    [string[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "initOwner"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pausePools"
  ): TypedContractMethod<[_poolIds: BigNumberish[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removePoolByAdmin"
  ): TypedContractMethod<
    [baseToken: AddressLike, quoteToken: AddressLike, pool: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpausePools"
  ): TypedContractMethod<[_poolIds: BigNumberish[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateDefaultMaintainer"
  ): TypedContractMethod<[_newMaintainer: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateGGNPTemplate"
  ): TypedContractMethod<[_newGGNPTemplate: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "upgradeChildTo"
  ): TypedContractMethod<
    [newChildImplementation: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "NewGGNP"
  ): TypedContractEvent<
    NewGGNPEvent.InputTuple,
    NewGGNPEvent.OutputTuple,
    NewGGNPEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferPrepared"
  ): TypedContractEvent<
    OwnershipTransferPreparedEvent.InputTuple,
    OwnershipTransferPreparedEvent.OutputTuple,
    OwnershipTransferPreparedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RemoveGGNP"
  ): TypedContractEvent<
    RemoveGGNPEvent.InputTuple,
    RemoveGGNPEvent.OutputTuple,
    RemoveGGNPEvent.OutputObject
  >;
  getEvent(
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
  >;

  filters: {
    "NewGGNP(address,address,address)": TypedContractEvent<
      NewGGNPEvent.InputTuple,
      NewGGNPEvent.OutputTuple,
      NewGGNPEvent.OutputObject
    >;
    NewGGNP: TypedContractEvent<
      NewGGNPEvent.InputTuple,
      NewGGNPEvent.OutputTuple,
      NewGGNPEvent.OutputObject
    >;

    "OwnershipTransferPrepared(address,address)": TypedContractEvent<
      OwnershipTransferPreparedEvent.InputTuple,
      OwnershipTransferPreparedEvent.OutputTuple,
      OwnershipTransferPreparedEvent.OutputObject
    >;
    OwnershipTransferPrepared: TypedContractEvent<
      OwnershipTransferPreparedEvent.InputTuple,
      OwnershipTransferPreparedEvent.OutputTuple,
      OwnershipTransferPreparedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RemoveGGNP(address)": TypedContractEvent<
      RemoveGGNPEvent.InputTuple,
      RemoveGGNPEvent.OutputTuple,
      RemoveGGNPEvent.OutputObject
    >;
    RemoveGGNP: TypedContractEvent<
      RemoveGGNPEvent.InputTuple,
      RemoveGGNPEvent.OutputTuple,
      RemoveGGNPEvent.OutputObject
    >;

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
  };
}
