<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title><?php echo $_GET['title']; ?></title>
  <meta property="og:image" content="<?php echo $_GET['image']; ?>" /> 
  <meta property="og:description" content="<?php echo $_GET['des']; ?>>" /> 
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo $_GET['url']; ?>" /> 
</head>
<body>
<script>
(function(){
	window.location.href= "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(document.location.href);
}());
</script>
</body>
</html>