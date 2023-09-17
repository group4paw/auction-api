## Auction API

#### Get all items

```http
  GET /auction/add
```

| Parameter       | Type     | Description                                              |
| :-------------- | :------- | :------------------------------------------------------- |
| `startingPrice` | `number` | **Required**. The painting's original price              |
| `reservePrice`  | `number` | **Required**. The least permitted bid                    |
| `startDate`     | `string` | **Required**. The auction starting DateTime, stringified |
| `endDate`       | `string` | **Required**. The auction ending DateTime, stringified   |
| `idPainting`    | `string` | **Required**. The object id of the painting.             |

#### Get item

```http
  GET /auction
```

| Parameter | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `status`  | `string` | Filter auction status. Values are `scheduled`, `ongoing`, and `over` |

## Things changed

- Auction id is not used as mongo already assign an id (might add later when actually needed)
- Auction status is not used as it is redundant and error prone
