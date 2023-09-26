## Auction API

An auction is the way seller and buyers interact. Sellers will start an auction for a painting they made and buyers can bid to buy the painting they wish to have. Auctions are held in a limited amount of time.

### Endpoints

```
POST /auction/add
GET /auction
GET /auction/:id
DELETE /auction/:id/delete
```

### Auction Object

```json
{
	"_id": "650ab75d1efe5c8445082b2d",
	"owner": "6505751888946e0d312bcdf0",
	"startingPrice": 210,
	"reservePrice": 250,
	"startDate": "2023-09-09T17:00:00.000Z",
	"endDate": "2023-09-11T17:00:00.000Z",
	"idPainting": 0,
	"bidders": [],
	"__v": 0,
	"status": "over"
}
```

| Key             | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `_id`           | ObjectID | The auction id. Provided by MongoDB      |
| `startingPrice` | Number   | The painting's starting price.           |
| `reservePrice`  | Number   | The minimum amount of bid a buy can bid. |
| `startDate`     | Date     | The auction's starting date.             |
| `endDate`       | Date     | The auction's ending date.               |
| `idPainting`    | Number   | The painting's id.                       |
| `bidders`       | Array    | List of bids.                            |
| `status`        | String   | The auction's status                     |

### Create an auction

```shell
curl -X POST http://localhost:3000/auction/add \
  -H "Content-Type: application/json" \
  -d '{
    "startingPrice": 1000,
    "reservePrice": 800,
    "startDate": "2023-09-20T12:00:00Z",
    "endDate": "2023-09-25T18:00:00Z",
    "idPainting": "15"
  }'
```

| Parameter       | Type     | Description                                              |
| :-------------- | :------- | :------------------------------------------------------- |
| `startingPrice` | `number` | **Required**. The painting's original price              |
| `reservePrice`  | `number` | **Required**. The least permitted bid                    |
| `startDate`     | `string` | **Required**. The auction starting DateTime, stringified |
| `endDate`       | `string` | **Required**. The auction ending DateTime, stringified   |
| `idPainting`    | `string` | **Required**. The object id of the painting.             |

### Get auctions

```shell
curl -X GET http://localhost:3000/auction?status=ongoing
```

```shell
curl -X GET http://localhost:3000/auction/650aa99f546bacd802eb8bbb
```

| Parameter | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `id`      | `string` | The auction id. Inserting id will ignore all other filters           |
| `status`  | `string` | Filter auction status. Values are `scheduled`, `ongoing`, and `over` |

### Bid on auction

```shell
curl -X PUT http://localhost:3000/auction/650aa99f546bacd802eb8bbb/bid \
  -H "Content-Type: application/json" \
  -d '{
    "userid": "6505751888946e0d312bcdf0",
    "amount": 1000
  }'
```

| Parameter | Type     | Description          |
| :-------- | :------- | :------------------- |
| `userid`  | `string` | The id of the bidder |
| `amount`  | `number` | Amount of bid.       |

### Delete auction

```shell
curl -X DELETE "http://localhost:3000/auction/650aa99f546bacd802eb8bbb/delete" \
  -H "Content-Type: application/json" \
  -d '{
    "userid": "6505751888946e0d312bcdf0",
  }'

```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `userid`  | `string` | **Required**. User id of the owner. |

## Things changed

- Auction id is not used as mongo already assign an id (might add later when actually needed)
- Auction status is not used as it is redundant and error prone
