		<div class="card manager-header">
			<div class="container">

				<div class="projecttitle"><a href="view.html"><?php echo $data->writer."/".$data->title ?></a></div>
				<p><?php echo $data->description ?></p>

			</div>
			<div class="divider"></div>
			<div class="container">

				<ul class="tabs row">
					<li class="tab col"><a href="#code">code</a></li>
					<li class="tab col"><a href="#version">versions</a></li>
			<?php if($param->version != 1){ ?>
					<li class="tab col"><a href="#compare">Compare</a></li>
			<?php } ?>
				</ul>

			</div>
		</div>
		<div class="container">
