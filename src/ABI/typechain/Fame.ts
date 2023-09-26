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

export declare namespace FameMarkets {
  export type IncomeDataStruct = {
    referralIncome: BigNumberish;
    dividendIncome: BigNumberish;
    pendingDividendIncome: BigNumberish;
    subjectIncome: BigNumberish;
  };

  export type IncomeDataStructOutput = [
    referralIncome: bigint,
    dividendIncome: bigint,
    pendingDividendIncome: bigint,
    subjectIncome: bigint
  ] & {
    referralIncome: bigint;
    dividendIncome: bigint;
    pendingDividendIncome: bigint;
    subjectIncome: bigint;
  };

  export type PeekDataStruct = {
    referralIncome: BigNumberish;
    dividendIncome: BigNumberish;
    pendingDividendIncome: BigNumberish;
    sharesMasterIncome: BigNumberish;
    referredBy: AddressLike;
  };

  export type PeekDataStructOutput = [
    referralIncome: bigint,
    dividendIncome: bigint,
    pendingDividendIncome: bigint,
    sharesMasterIncome: bigint,
    referredBy: string
  ] & {
    referralIncome: bigint;
    dividendIncome: bigint;
    pendingDividendIncome: bigint;
    sharesMasterIncome: bigint;
    referredBy: string;
  };
}

export interface FameInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "_dividendFeePercent"
      | "_dividendIncome"
      | "_dividendPerShare"
      | "_dividendPerShareLast"
      | "_master2Subject"
      | "_protocolFee"
      | "_protocolFeeDestination"
      | "_protocolFeePercent"
      | "_referral1FeePercent"
      | "_referral2FeePercent"
      | "_referralIncome"
      | "_referredBy"
      | "_sharesBalance"
      | "_sharesSupply"
      | "_subject2Master"
      | "_subjectFeePercent"
      | "_subjectMasterCollectedIncome"
      | "_subjectMasterIncome"
      | "buyShares"
      | "getBuyPrice"
      | "getBuyPriceAfterFee"
      | "getIncome"
      | "getPrice"
      | "getSellPrice"
      | "getSellPriceAfterFee"
      | "grantMaster"
      | "owner"
      | "peek"
      | "renounceOwnership"
      | "sellShares"
      | "setDividendFeePercent"
      | "setFeeDestination"
      | "setProtocolFeePercent"
      | "setReferralFeePercent"
      | "setSubjectFeePercent"
      | "transferOwnership"
      | "withdrawDividendIncome"
      | "withdrawProtocolFee"
      | "withdrawReferralIncome"
      | "withdrawSubjectIncome"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferred" | "Trade" | "WithdrawIncome"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "_dividendFeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_dividendIncome",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_dividendPerShare",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_dividendPerShareLast",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_master2Subject",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_protocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_protocolFeeDestination",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_protocolFeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_referral1FeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_referral2FeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_referralIncome",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_referredBy",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_sharesBalance",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "_sharesSupply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_subject2Master",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_subjectFeePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_subjectMasterCollectedIncome",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_subjectMasterIncome",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyShares",
    values: [BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBuyPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBuyPriceAfterFee",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getIncome",
    values: [BigNumberish[], AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSellPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSellPriceAfterFee",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantMaster",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "peek",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellShares",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDividendFeePercent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeDestination",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFeePercent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setReferralFeePercent",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSubjectFeePercent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawDividendIncome",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawReferralIncome",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawSubjectIncome",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_dividendFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_dividendIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_dividendPerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_dividendPerShareLast",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_master2Subject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_protocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_protocolFeeDestination",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_protocolFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_referral1FeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_referral2FeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_referralIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_referredBy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_sharesBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_sharesSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_subject2Master",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_subjectFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_subjectMasterCollectedIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_subjectMasterIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyShares", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBuyPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBuyPriceAfterFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getIncome", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSellPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSellPriceAfterFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantMaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "peek", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sellShares", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDividendFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeDestination",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setReferralFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSubjectFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawDividendIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawReferralIncome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawSubjectIncome",
    data: BytesLike
  ): Result;
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

export namespace TradeEvent {
  export type InputTuple = [
    trader: AddressLike,
    subject: BigNumberish,
    isBuy: boolean,
    shareAmount: BigNumberish,
    ethAmount: BigNumberish,
    protocolEthAmount: BigNumberish,
    supply: BigNumberish,
    balance: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    trader: string,
    subject: bigint,
    isBuy: boolean,
    shareAmount: bigint,
    ethAmount: bigint,
    protocolEthAmount: bigint,
    supply: bigint,
    balance: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    trader: string;
    subject: bigint;
    isBuy: boolean;
    shareAmount: bigint;
    ethAmount: bigint;
    protocolEthAmount: bigint;
    supply: bigint;
    balance: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawIncomeEvent {
  export type InputTuple = [
    incomeType: BigNumberish,
    user: AddressLike,
    dividendIncome: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    incomeType: bigint,
    user: string,
    dividendIncome: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    incomeType: bigint;
    user: string;
    dividendIncome: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Fame extends BaseContract {
  connect(runner?: ContractRunner | null): Fame;
  waitForDeployment(): Promise<this>;

  interface: FameInterface;

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

  _dividendFeePercent: TypedContractMethod<[], [bigint], "view">;

  _dividendIncome: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  _dividendPerShare: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  _dividendPerShareLast: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;

  _master2Subject: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  _protocolFee: TypedContractMethod<[], [bigint], "view">;

  _protocolFeeDestination: TypedContractMethod<[], [string], "view">;

  _protocolFeePercent: TypedContractMethod<[], [bigint], "view">;

  _referral1FeePercent: TypedContractMethod<[], [bigint], "view">;

  _referral2FeePercent: TypedContractMethod<[], [bigint], "view">;

  _referralIncome: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  _referredBy: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  _sharesBalance: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;

  _sharesSupply: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  _subject2Master: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  _subjectFeePercent: TypedContractMethod<[], [bigint], "view">;

  _subjectMasterCollectedIncome: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  _subjectMasterIncome: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  buyShares: TypedContractMethod<
    [
      sharesSubject: BigNumberish,
      amount: BigNumberish,
      referredBy: AddressLike
    ],
    [void],
    "payable"
  >;

  getBuyPrice: TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  getBuyPriceAfterFee: TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  getIncome: TypedContractMethod<
    [sharesSubjects: BigNumberish[], user: AddressLike],
    [FameMarkets.IncomeDataStructOutput],
    "view"
  >;

  getPrice: TypedContractMethod<
    [supply: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  getSellPrice: TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  getSellPriceAfterFee: TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  grantMaster: TypedContractMethod<
    [sharesSubject: BigNumberish, master: AddressLike],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  peek: TypedContractMethod<
    [sharesSubject: BigNumberish, user: AddressLike],
    [FameMarkets.PeekDataStructOutput],
    "view"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  sellShares: TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [void],
    "payable"
  >;

  setDividendFeePercent: TypedContractMethod<
    [dividendFeePercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  setFeeDestination: TypedContractMethod<
    [feeDestination: AddressLike],
    [void],
    "nonpayable"
  >;

  setProtocolFeePercent: TypedContractMethod<
    [feePercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  setReferralFeePercent: TypedContractMethod<
    [referral1FeePercent: BigNumberish, referral2FeePercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  setSubjectFeePercent: TypedContractMethod<
    [feePercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawDividendIncome: TypedContractMethod<
    [sharesSubjects: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  withdrawProtocolFee: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawReferralIncome: TypedContractMethod<[], [void], "nonpayable">;

  withdrawSubjectIncome: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "_dividendFeePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_dividendIncome"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "_dividendPerShare"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "_dividendPerShareLast"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "_master2Subject"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "_protocolFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_protocolFeeDestination"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "_protocolFeePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_referral1FeePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_referral2FeePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_referralIncome"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "_referredBy"
  ): TypedContractMethod<[arg0: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "_sharesBalance"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "_sharesSupply"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "_subject2Master"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "_subjectFeePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_subjectMasterCollectedIncome"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "_subjectMasterIncome"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyShares"
  ): TypedContractMethod<
    [
      sharesSubject: BigNumberish,
      amount: BigNumberish,
      referredBy: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getBuyPrice"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBuyPriceAfterFee"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getIncome"
  ): TypedContractMethod<
    [sharesSubjects: BigNumberish[], user: AddressLike],
    [FameMarkets.IncomeDataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPrice"
  ): TypedContractMethod<
    [supply: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getSellPrice"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getSellPriceAfterFee"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "grantMaster"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, master: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "peek"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, user: AddressLike],
    [FameMarkets.PeekDataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "sellShares"
  ): TypedContractMethod<
    [sharesSubject: BigNumberish, amount: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setDividendFeePercent"
  ): TypedContractMethod<
    [dividendFeePercent: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setFeeDestination"
  ): TypedContractMethod<[feeDestination: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setProtocolFeePercent"
  ): TypedContractMethod<[feePercent: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setReferralFeePercent"
  ): TypedContractMethod<
    [referral1FeePercent: BigNumberish, referral2FeePercent: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setSubjectFeePercent"
  ): TypedContractMethod<[feePercent: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawDividendIncome"
  ): TypedContractMethod<
    [sharesSubjects: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawProtocolFee"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawReferralIncome"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawSubjectIncome"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Trade"
  ): TypedContractEvent<
    TradeEvent.InputTuple,
    TradeEvent.OutputTuple,
    TradeEvent.OutputObject
  >;
  getEvent(
    key: "WithdrawIncome"
  ): TypedContractEvent<
    WithdrawIncomeEvent.InputTuple,
    WithdrawIncomeEvent.OutputTuple,
    WithdrawIncomeEvent.OutputObject
  >;

  filters: {
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

    "Trade(address,uint256,bool,uint256,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<
      TradeEvent.InputTuple,
      TradeEvent.OutputTuple,
      TradeEvent.OutputObject
    >;
    Trade: TypedContractEvent<
      TradeEvent.InputTuple,
      TradeEvent.OutputTuple,
      TradeEvent.OutputObject
    >;

    "WithdrawIncome(uint8,address,uint256,uint256)": TypedContractEvent<
      WithdrawIncomeEvent.InputTuple,
      WithdrawIncomeEvent.OutputTuple,
      WithdrawIncomeEvent.OutputObject
    >;
    WithdrawIncome: TypedContractEvent<
      WithdrawIncomeEvent.InputTuple,
      WithdrawIncomeEvent.OutputTuple,
      WithdrawIncomeEvent.OutputObject
    >;
  };
}
