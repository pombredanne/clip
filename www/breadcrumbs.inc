    <!-- breadcrumbs -->
    <div id="crumbs">
		<ul>
		<?php
		  $breadcrumbs = array();
		  
		  // if this is an individual license page, add a crumb to both the license info page and
		  // the tab
		  if(isset($_GET['id'])){
		  	 // tab
		  	 if(preg_match('/license\-info\.php\Z/', $_SERVER["PHP_SELF"])){
          	$breadcrumbs[] = array(
          	  'title' => 'License information',
          	  'url' => 'license-info.php?id=' . $_GET['id'],
          	);
          }
		    else if(preg_match('/license\-text\.php\Z/', $_SERVER["PHP_SELF"])){
		      $breadcrumbs[] = array(
		      'title' => 'License text',
		      'url' => 'license-text.php?id=' . $_GET['id'],
		      );
		    }
		    else if(preg_match('/license\-benchmarks\.php\Z/', $_SERVER["PHP_SELF"])){
		      $breadcrumbs[] = array(
		      'title' => 'License benchmarks',
		      'url' => 'license-benchmarks.php?id=' . $_GET['id'],
		      );
		    }
		    else if(preg_match('/license\-metadata\.php\Z/', $_SERVER["PHP_SELF"])){
		      $breadcrumbs[] = array(
		      'title' => 'License metadata',
		      'url' => 'license-metadata.php?id=' . $_GET['id'],
		      );
		    }
          
          // license id
          $breadcrumbs[] = array(
		      'title' => $_GET['id'],
		      'url' => 'license-info.php?id=' . $_GET['id'],
		    );
		  }
		  
		  // if there's a category (referring list page or actual), add this to the breadcrumbs
		  $cat = null;
		  if(isset($_GET['cat']))
		    $cat = $_GET['cat'];
		  else if(isset($_GET['rc']))
		    $cat = $_GET['rc'];
		      
		  if($cat){
		    $breadcrumbs[] = array(
		     'title' => ucfirst($cat) . ' licenses',
		     'url' => 'license-list.php?cat=' . $cat,
		    );
        }
		  
		  // always add a home link
		  $breadcrumbs[] = array(
          	  'title' => 'Home',
          	  'url' => 'index.php',
          	);
          	
        $breadcrumbs[0]['class'] = 'last';
		     
		  // write out the breadcrumbs
		  foreach(array_reverse($breadcrumbs) as $crumb){
		  	 print '<li ' . (!empty($crumb['class']) ? 'class="' . $crumb['class'] . '"' : '') . '><a href="' . $crumb['url'] . '">' . $crumb['title'] . '</a></li>';
		  }
		?>
		</ul>	
    </div>
		