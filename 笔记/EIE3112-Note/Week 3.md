# Create/Drop
## Create Database
```sql
CREATE DATABASE IF NOT EXISTS database_name
```

## Drop Database
```sql
DROP DATABASE IF EXISTS database_name;
```

## Create Table
```sql
CREATE TABLE IF NOT EXISTS table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    column3 datatype constraints,
    PRIMARY KEY (column1),
    FOREIGN KEY (column2) REFERENCES other_table(column)
);
```

## Drop Table
```sql
DROP TABLE IF EXISTS table_name;
```
## InnoDB
InnoDB是MySQL 5.7默认的高性能、高可靠存储引擎。若未指定引擎，`CREATE TABLE`将默认创建InnoDB表。
## Foreign Key Constraints
外键约束用于确保表之间数据的一致性。以下是不同的外键约束行为：
- NO ACTION: 若子表有匹配记录，禁止父表删除/更新（同 RESTRICT）。
- RESTRICT: 立即禁止父表的删除/更新操作。
- CASCADE: 级联操作。父表记录删除/更新时，子表自动随之删除/更新。
- SET NULL: 父表记录删除/更新时，子表对应外键列设为 NULL（需支持 NULL 值）
---
CASCADE (级联)
规则：父随子变。
例子：删除 ID 为 10 的用户，系统自动删除该用户所有的订单。
适用：主从关系紧密的数据（如订单明细）。
SET NULL (置空)
规则：父删子留，关联设为空。
例子：删除一名员工，该员工负责的所有历史订单不会消失，但 operator_id 列会被自动设为 NULL。
适用：需要保留子表记录作为统计，但不强制关联父表。
RESTRICT / NO ACTION (限制/禁止)
规则：只要子表有数据，父表就不准动。
例子：你想删除有订单存在的用户 ID 10，数据库直接报错拒绝执行，直到你先手动删完他的所有订单。
适用防误删，确保数据完整性（MySQL中两者表现基本一致）

---
# SELECT
## SELECT/FROM
SELECT 语句用于从数据库中选择数据。可以使用星号(\*)选择所有列，或指定特定列名。
FROM 子句指定要查询的表。可以是一个表或多个表(多个表通过 JOIN 连接)。

```sql
-- 选择所有列
SELECT * FROM table_name;

-- 选择特定列
SELECT column1, column2 FROM table_name;

-- 使用表达式
SELECT column1, column2 AS alias_name FROM table_name;
```
## WHERE
WHERE 子句用于过滤行，只有满足条件的行才会被返回。

```sql
-- 简单条件
SELECT * FROM customers WHERE age > 18;
SELECT FirstName, LastName FROM Students WHERE GPA IS NULL;#对NULL筛选

-- 复合条件
SELECT * FROM customers
WHERE age > 18 AND name LIKE 'ZHANG%';#对于LIKE的使用

-- 范围查询
SELECT * FROM products
WHERE price BETWEEN 10 AND 100;#BETWEEN的使用，同样可以用作DATE格式下的日期区间查询
```

## GROUP BY
GROUP BY 子句将结果集按一个或多个列进行分组，**通常与聚合函数一起使用**。

```sql
-- 按城市分组统计客户数量
SELECT city, COUNT(*) as customer_count
FROM customers
GROUP BY city;

-- 多列分组
SELECT city, gender, AVG(age) as avg_age
FROM customers
GROUP BY city, gender;
```

## HAVING
HAVING 子句用于过滤分组后的结果，类似于 WHERE 子句，但作用于分组而不是单个行。

```sql
-- 过滤分组后统计数量大于10的
SELECT city, COUNT(*) as customer_count
FROM customers
GROUP BY city
HAVING COUNT(*) > 10;

-- 结合多个条件
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 5000 AND COUNT(*) >= 5;
```

## ORDER BY
ORDER BY 子句用于对结果集进行排序，默认为升序(ASC)，可使用 DESC 指定降序。

```sql
-- 按单列升序排序
SELECT * FROM customers ORDER BY age ASC;

-- 按单列降序排序
SELECT * FROM customers ORDER BY age DESC;

-- 按多列排序
SELECT * FROM customers
ORDER BY city ASC, age DESC;
```