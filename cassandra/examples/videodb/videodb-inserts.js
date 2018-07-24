/*
each time the application is restarted the data will be truncated and re-inserted
you can also manually create the data using cql scripts
ref: https://github.com/pmcfadin/cassandra-videodb-sample-schema
*/

//User_credentials
const user_credentials = [];
user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" +
  "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,'tcodd@relational.com','5f4dcc3b5aa765d61d8327deb882cf99');");

user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" +
  "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,'cdate@relational.com','6cb75f652a9b52798eb6cf2201057c73');");

user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" +
  "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,'patrick@datastax.com','ba27e03fd95e507daf2937c937d499ab');");

//Users
const users = [];
users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" +
  "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,'Ted','Codd', 'tcodd@relational.com','2011-06-01 08:00:00');");

users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" +
  "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,'Chris','Date', 'cdate@relational.com','2011-06-20 13:50:00');");

users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" +
  "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,'Patrick','McFadin', 'patrick@datastax.com','2011-06-20 13:50:00');");

//Videos
const videos = [];
videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,'My funny cat',d0f60aa8-54a9-4840-b70c-fe562b68842b, 'My cat likes to play the piano! So funny.','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401',1,{'10':'/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401'},{'cats','piano','lol'},'2012-06-01 08:00:00');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (b3a76c6b-7c7f-4af6-964f-803a9283c401,'Now my dog plays piano!',d0f60aa8-54a9-4840-b70c-fe562b68842b, 'My dog learned to play the piano because of the cat.','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401',1,{'10':'/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401'},{'dogs','piano','lol'},'2012-08-30 16:50:00');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (0c3f7e87-f6b6-41d2-9668-2b64d117102c,'An Introduction to Database Systems',522b1fe2-2e36-4cef-a667-cd4237d08b89, 'An overview of my book','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c',1,{'10':'/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c'},{'database','relational','book'},'2012-09-03 10:30:00');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (416a5ddc-00a5-49ed-adde-d99da9a27c0c,'Intro to CAP theorem',522b1fe2-2e36-4cef-a667-cd4237d08b89, 'I think there might be something to this.','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c',1,{'10':'/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c'},{'database','cap','brewer'},'2012-12-01 11:29:00');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (06049cbb-dfed-421f-b889-5f649a0de1ed,'The data model is dead. Long live the data model.',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'First in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=px6U2n74q3g',1,{'YouTube':'http://www.youtube.com/watch?v=px6U2n74q3g'},{'cassandra','data model','relational','instruction'},'2013-05-02 12:30:29');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (873ff430-9c23-4e60-be5f-278ea2bb21bd,'Become a Super Modeler',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'Second in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=qphhxujn5Es',1,{'YouTube':'http://www.youtube.com/watch?v=qphhxujn5Es'},{'cassandra','data model','cql','instruction'},'2013-05-16 16:50:00');");

videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" +
  "VALUES (49f64d40-7d89-4890-b910-dbf923563a33,'The World''s Next Top Data Model',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'Third in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=HdJlsOZVGwM',1,{'YouTube':'http://www.youtube.com/watch?v=HdJlsOZVGwM'},{'cassandra','data model','examples','instruction'},'2013-06-11 11:00:00');");


// user_videos - Every video a user uploads is indexed into a single partition by username
const user_videos = [];
user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,b3a76c6b-7c7f-4af6-964f-803a9283c401,'2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,0c3f7e87-f6b6-41d2-9668-2b64d117102c,'2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,416a5ddc-00a5-49ed-adde-d99da9a27c0c,'2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,06049cbb-dfed-421f-b889-5f649a0de1ed,'2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,873ff430-9c23-4e60-be5f-278ea2bb21bd,'2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" +
  "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,49f64d40-7d89-4890-b910-dbf923563a33,'2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");


//latest_videos
const latest_videos = [];
latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2012-06-01',99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2012-08-30',b3a76c6b-7c7f-4af6-964f-803a9283c401,'2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2013-05-02',0c3f7e87-f6b6-41d2-9668-2b64d117102c,'2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2012-12-01',416a5ddc-00a5-49ed-adde-d99da9a27c0c,'2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2013-05-02',06049cbb-dfed-421f-b889-5f649a0de1ed,'2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2013-05-16',873ff430-9c23-4e60-be5f-278ea2bb21bd,'2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" +
  "VALUES ('2013-06-11',49f64d40-7d89-4890-b910-dbf923563a33,'2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");


// Video Rating counters
const video_rating_update = [];
video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 3 " +
  "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");

video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 5 " +
  "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");

video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 4 " +
  "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");

// video_ratings_by_user
const video_ratings_by_user = [];
video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" +
  "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,3);");

video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" +
  "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,5);");

video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" +
  "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,4);");

// videos_by_tag
const videos_by_tag = [];
videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('cats',99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('piano',99051fe9-6a9c-46c2-b949-38ef78858dd0, '2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('lol',99051fe9-6a9c-46c2-b949-38ef78858dd0, '2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('dogs',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('piano',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('lol',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('database',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('relational',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('book',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('database',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('cap',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('brewer',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('cassandra',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('data model',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('relational',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('instruction',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('cassandra',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('data model',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('relational',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('instruction',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('cassandra',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('data model',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('examples',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");

videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" +
  "VALUES ('instruction',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");

// Video Comments. One for each side of the view.
// Insert in pairs
// This is done using the batch command to group our operations.
const comments_by_video = [];
comments_by_video.push("BEGIN BATCH " +
  "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,now(), 'Worst. Video. Ever.')" +
  "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,now(), 'Worst. Video. Ever.')" +
  "APPLY BATCH;");

comments_by_video.push("BEGIN BATCH " +
  "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment) " +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,522b1fe2-2e36-4cef-a667-cd4237d08b89,now(), 'It is amazing') " +
  "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment) " +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,522b1fe2-2e36-4cef-a667-cd4237d08b89,now(), 'It is amazing') " +
  "APPLY BATCH;");

// Video events
const video_event = [];
video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp) " +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'start',now(),0);");
video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'stop',now(),30000);");
video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'start',now(),3000);");
video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" +
  "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'stop',now(),230000);");

const async = require("async");
const tables = [
  "user_credentials",
  "users",
  "videos",
  "user_videos",
  "latest_videos",
  "video_rating",
  "video_ratings_by_user",
  "videos_by_tag",
  "tags_by_letter",
  "comments_by_video",
  "comments_by_user",
  "video_event"
];
/**
 * TRUNCATE tables then insert the data.
 * @param {array} inserts - List of insert statements .
 */
const inserts = (inserts) => (
  async.each(inserts, function (insert, callback) {
    client.execute(insert, function (err) {
      if (err) {
        console.log(err);
      }
      callback();
    });
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('done inserting');
    }
  })
)
};
module.exports = function (client) {
  /**
   * TRUNCATE tables then insert the data.this will run everytime the server is restarted
   *
   * @param {array} tables - List of tables.
   */
  (() => {
    async.each(tables, function (table, callback) {
      client.execute(`TRUNCATE TABLE killrvideo.${table};`, function (err) {
        if (err) {
          console.log(err);
        }
        console.log(`truncated table ${table}`)
        callback();
      });
    }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('done truncating tables');
        /**
         * Insert all the data
         *
         * @param {array} user_credentials -List of insert statements. table user_credentials.
         * @param {array} users -List of insert statements. table users.
         * @param {array} videos -List of insert statements. table videos.
         * @param {array} user_videos -List of insert statements.table user_videos.
         * @param {array} latest_videos -List of insert statements.table latest_videos.
         * @param {array} video_rating_update - List of insert statements.table video_rating_update.
         * @param {array} video_ratings_by_user - List of insert statements.table video_ratings_by_user.
         * @param {array} videos_by_tag - List of insert statements.table videos_by_tag.
         * @param {array} comments_by_video - List of insert statements.table comments_by_video.
         * @param {array} video_event - List of insert statements .table video_event.
         */
        inserts(user_credentials)
        inserts(users)
        inserts(videos)
        inserts(user_videos)
        inserts(latest_videos)
        inserts(video_rating_update)
        inserts(video_ratings_by_user)
        inserts(videos_by_tag)
        inserts(comments_by_video)
        inserts(video_event)
      }
    })
  })()


