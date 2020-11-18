import { Stream } from "xstream";
import { Adaptor } from "./adaptor";
import * as requests from "./requests";
import * as responses from "./responses";
import { RpcClient } from "./rpcclients";
export declare class Client {
  /**
   * Creates a new Tendermint client for the given endpoint.
   *
   * Uses HTTP when the URL schema is http or https. Uses WebSockets otherwise.
   *
   * If the adaptor is not set an auto-detection is performed.
   */
  static connect(url: string, adaptor?: Adaptor): Promise<Client>;
  /**
   * Creates a new Tendermint client given an RPC client.
   *
   * If the adaptor is not set, an auto-detection is performed.
   */
  static create(rpcClient: RpcClient, adaptor?: Adaptor): Promise<Client>;
  private static detectVersion;
  private readonly client;
  private readonly p;
  private readonly r;
  /**
   * Use `Client.connect` or `Client.create` to create an instance.
   */
  private constructor();
  disconnect(): void;
  abciInfo(): Promise<responses.AbciInfoResponse>;
  abciQuery(params: requests.AbciQueryParams): Promise<responses.AbciQueryResponse>;
  block(height?: number): Promise<responses.BlockResponse>;
  blockResults(height?: number): Promise<responses.BlockResultsResponse>;
  /**
   * Queries block headers filtered by minHeight <= height <= maxHeight.
   *
   * @param minHeight The minimum height to be included in the result. Defaults to 0.
   * @param maxHeight The maximum height to be included in the result. Defaults to infinity.
   */
  blockchain(minHeight?: number, maxHeight?: number): Promise<responses.BlockchainResponse>;
  /**
   * Broadcast transaction to mempool and wait for response
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
   */
  broadcastTxSync(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxSyncResponse>;
  /**
   * Broadcast transaction to mempool and do not wait for result
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  broadcastTxAsync(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxAsyncResponse>;
  /**
   * Broadcast transaction to mempool and wait for block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
   */
  broadcastTxCommit(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxCommitResponse>;
  commit(height?: number): Promise<responses.CommitResponse>;
  genesis(): Promise<responses.GenesisResponse>;
  health(): Promise<responses.HealthResponse>;
  status(): Promise<responses.StatusResponse>;
  subscribeNewBlock(): Stream<responses.NewBlockEvent>;
  subscribeNewBlockHeader(): Stream<responses.NewBlockHeaderEvent>;
  subscribeTx(query?: requests.QueryString): Stream<responses.TxEvent>;
  /**
   * Get a single transaction by hash
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx
   */
  tx(params: requests.TxParams): Promise<responses.TxResponse>;
  /**
   * Search for transactions that are in a block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx_search
   */
  txSearch(params: requests.TxSearchParams): Promise<responses.TxSearchResponse>;
  txSearchAll(params: requests.TxSearchParams): Promise<responses.TxSearchResponse>;
  validators(height?: number): Promise<responses.ValidatorsResponse>;
  private doCall;
  private subscribe;
}
