#!/bin/bash
echo "====================================="
echo "Start ..."
echo `date`
echo "====================================="

Sql 내용.
mysql -hrti.cqmaumynjbfr.ap-northeast-2.rds.amazonaws.com -uadmin -proadtointerview -P13306 RTI -e "insert into rankings(id,nickname,users_id,likes,createdAt,updatedAt) 
select NULL as id ,u.nickname,l.users_id, count(l.id) as likes, now() as createdAt,now() as updatedAt
from users u
join likes l
on u.id = l.users_id
group by l.id
order by likes desc
limit 10;
"<< EOF

EOF

echo "====================================="
echo `date`