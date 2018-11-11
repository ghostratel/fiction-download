MongoDB常用管道符

(0) 

假设数据库user下有两个集合userinfo和userfrom.

userinfo集合中的数据:

![](http://ww1.sinaimg.cn/large/e3507465gy1fx46ytsk6ej20sw09njs1.jpg)

userfrom集合中的数据:

![](http://ww1.sinaimg.cn/large/e3507465gy1fx46zb0a7uj20f402vglj.jpg)

(1) $project

管道操作符`$project`用来控制查询结果显示的字段，下方语句表示查询出来的文档
显示其name和from字段

```javascript
db.userinfo.aggregate([
      {
          $project: {name: 1, from: 1}
      }
  ])
```


result:
```javascript
{ "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "from" : "earth" }
{ "_id" : ObjectId("5be6c06943778816488aef97"), "name" : "灭霸", "from" : "cosmos" }
{ "_id" : ObjectId("5be6c4a3a1641007e09ab933"), "name" : "格鲁特", "from" : "cosmos" }
{ "_id" : ObjectId("5be6ff36f2bac600909026c3"), "name" : "星爵", "from" : "cosmos" }
{ "_id" : ObjectId("5be7aef53ea0520550796519"), "name" : "火箭浣熊", "from" : "cosmos" }
{ "_id" : ObjectId("5be7d3703ea052055079651a"), "name" : "索尔", "from" : "cosmos" }
{ "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美国队长", "from" : "earth" }
{ "_id" : ObjectId("5be7d53773ae2929fc5670d9"), "name" : "钢铁侠", "from" : "earth" }
{ "_id" : ObjectId("5be7da14fc0402147c12055a"), "name" : "曼哈顿博士", "from" : "earth" }
```
  
(2) $match

管道操作符`$match`用来筛选数据,下方语句表示筛选age字段值大于100且from字段值等于'earth'的文档。当age字段值类型为String时，无法进行比较。

以下语句$match和$project管道顺序调换后无法正常查询到数据，是因为$project控制文档显示的字段为name和from，所以age无法进行比较，所以无法正常查询到数据。在书写数据库查询语句时应注意这点！

```javascript
    db.userinfo.aggregate([
        {
            $match: {age: {$gt: 100}, from: {$eq: 'earth'}}
        },
        {
            $project: {name: 1, from : 1}
        }
    ])
```

result: 
```javascript
{ "_id" : ObjectId("5be7da14fc0402147c12055a"), "name" : "曼哈顿博士", "from" : "earth" }
```


(3) $group
管道操作符`$group`用于将集合中的文档分组，一般用来统计结果。

```javascript
db.userinfo.aggregate([
    {
        $group: {_id: '$from', count: {$sum: 1}}
    }
])
```

result: 
```javascript
{ "_id" : "cosmos", "count" : 5 }
{ "_id" : "earth", "count" : 4 }
```


(4) $sort
管道操作符`$group`用于将集合中的文档排序。1为升序，-1为降序。

```javascript
db.userinfo.aggregate([
    {
        $project: {name: 1, age: 1}
    },
    {
        $sort: {age: 1}
    }
])
```

result: 
```javascript
{ "_id" : ObjectId("5be6c4a3a1641007e09ab933"), "name" : "格鲁特", "age" : 3 }
{ "_id" : ObjectId("5be7aef53ea0520550796519"), "name" : "火箭浣熊", "age" : 30 }
{ "_id" : ObjectId("5be6ff36f2bac600909026c3"), "name" : "星爵", "age" : 33 }
{ "_id" : ObjectId("5be7d53773ae2929fc5670d9"), "name" : "钢铁侠", "age" : 44 }
{ "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "age" : 45 }
{ "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美国队长", "age" : 80 }
{ "_id" : ObjectId("5be7da14fc0402147c12055a"), "name" : "曼哈顿博士", "age" : 150 }
{ "_id" : ObjectId("5be7d3703ea052055079651a"), "name" : "索尔", "age" : 1500 }
{ "_id" : ObjectId("5be6c06943778816488aef97"), "name" : "灭霸", "age" : 2000 }
```

(5) $limit

管道操作符`$limit`用来限制文档查询数量。

```javascript
db.userinfo.aggregate([
    {
        $match: {age: {$gt: 35}}
    },
    {
        $sort: {age: 1}  
    },
    {
        $limit: 3
    }
])
```

result:
```javascript
{ "_id" : ObjectId("5be7d53773ae2929fc5670d9"), "name" : "钢铁侠", "age" : 44, "from" : "earth" }
{ "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "age" : 45, "from" : "earth" }
{ "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美国队长", "age" : 80, "from" : "earth" }
```

(6) $skip
管道操作符`$skip`用来跳过一定数量的查询到的文档。

```javascript
db.userinfo.aggregate([
    {
        $match: {age: {$gt: 35}}
    },
    {
        $sort: {age: 1}  
    },
    {
        $limit: 3
    },
    {
        $skip: 1
    }
])
```

```javascript
{ "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "age" : 45, "from" : "earth" }
{ "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美国队长", "age" : 80, "from" : "earth" }
```

当交换`$limit`和`$skip`的管道顺序时，查询到的结果是不一样的。交换后的result:

```javascript
{ "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "age" : 45, "from" : "earth" }
{ "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美国队长", "age" : 80, "from" : "earth" }
{ "_id" : ObjectId("5be7da14fc0402147c12055a"), "name" : "曼哈顿博士", "age" : 150, "from" : "earth" }
```

(7) $lookup

管道操作符`$lookup`主要用来将多个集合进行关联查询。以下语句根据userfrom集合的comefrom字段对userinfo集合的文档进行关联查询。并将查询到的文档放到heros字段下。

```javascript
db.userfrom.aggregate([
    {
        $lookup: {
            from: 'userinfo',
            localField: 'comefrom',
            foreignField: 'from',
            as: 'heros'
        }
    }
])
```

result: 

```javascript
{ "_id" : ObjectId("5be7e28b7dbe653350b3d151"), "comefrom" : "earth", "heros" : [ { "_id" : ObjectId("5be18c280fd50eed27a00afd"), "name" : "浩克", "age" : 45, "from" : "earth" }, { "_id" : ObjectId("5be7d52873ae2929fc5670d8"), "name" : "美 国队长", "age" : 80, "from" : "earth" }, { "_id" : ObjectId("5be7d53773ae2929fc5670d9"), "name" : "钢铁侠", "age" : 44, "from" : "earth" }, { "_id" : ObjectId("5be7da14fc0402147c12055a"), "name" : "曼哈顿博士", "age" : 150, "from" : "earth" } ] }
{ "_id" : ObjectId("5be7e2977dbe653350b3d152"), "comefrom" : "cosmos", "heros" : [ { "_id" : ObjectId("5be6c06943778816488aef97"), "name" : "灭霸", "age" : 2000, "from" : "cosmos" }, { "_id" : ObjectId("5be6c4a3a1641007e09ab933"), "name" : "格鲁特", "age" : 3, "from" : "cosmos" }, { "_id" : ObjectId("5be6ff36f2bac600909026c3"), "name" : "星爵", "age" : 33, "from" : "cosmos" }, { "_id" : ObjectId("5be7aef53ea0520550796519"), "name" : "火箭浣熊", "age" : 30, "from" : "cosmos" }, { "_id" : ObjectId("5be7d3703ea052055079651a"), "name" : "索尔", "age" : 1500, "from" : "cosmos" } ] }
```