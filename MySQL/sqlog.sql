--
-- Table structure for table `ticket_log`
--
create database freshdb;
use freshdb;
DROP TABLE IF EXISTS `ticket_log2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_log2` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int(10) unsigned NOT NULL,
  `responder_id` varchar(50) ,
  `requester_id` varchar(50) NOT NULL,
  `group_id` varchar(50) ,
  `priority` int(5) NOT NULL,
  `source` int(1) DEFAULT NULL,
  `status` int(5) NOT NULL,
  `due_by` datetime DEFAULT NULL,
  `fr_due_by` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_time` datetime DEFAULT NULL,
  `closed_time` datetime DEFAULT NULL,
  `resolved_time_taken_hours` int DEFAULT NULL,
  `closed_time_taken_hours` int DEFAULT NULL,
  `due_time_duration_hours` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_id` (`ticket_id`),
  KEY `created_on` (`created_on`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

select * from `ticket_log2`

INSERT INTO ticket_log2(ticket_id,responder_id,requester_id,group_id,priority,source,status,due_by,fr_due_by,created_at,updated_at,due_time_duration_hours) VALUES (8375,null,43023954926,null,1,2,2,'2019-06-25 06:18:00','2019-06-23 06:18:00','2019-06-22 06:18:00','2019-06-25 06:21:28',time_to_sec(timediff('2019-06-25 06:18:00','2019-06-22 06:18:00'))/3600)
