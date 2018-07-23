	<!-- main section -->
	<section id="main">
	
		<?php include_once(_VIEW."/project/view_header.php"); ?>

			<?php include_once(_VIEW."/project/view_code.php"); ?>
			
			<?php include_once(_VIEW."/project/view_version.php"); ?>

	<?php if($param->version != 1){ ?>
			<?php include_once(_VIEW."/project/view_compare.php"); ?>
	<?php } ?>
			<!-- tab contents -->
		</div>
	</section>
	<!-- main section -->

	<!-- commit form -->
	<form id="commit" class="modal">
		<div class="modal-content">
			<h4>Commit</h4>
			<p>&nbsp;</p>
			<div class="input-field">
				<input type="text" id="title" name="title" autocomplete="off" required>
				<label for="title">title</label>
			</div>
			<div class="input-field">
				<input type="text" id="description" name="description" autocomplete="off" required>
				<label for="description">description</label>
			</div>
		</div>
		<div class="modal-footer input-field">
			<button href="#!" class="modal-action waves-effect waves-green btn-flat">Submit</button>
		</div>
	</form>
	<!-- commit form -->

	<!-- upload form -->
	<form id="upload" class="modal" action="upload.html">
		<div class="modal-content">
			<h4>Upload</h4>
			<p>&nbsp;</p>
			<div class="file-field input-field">
				<div class="btn">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<input type="file" name="file" required>
				</div>
				<div class="file-path-wrapper">
					<input class="file-path validate" type="text">
				</div>
			</div>
		</div>
		<div class="modal-footer input-field">
			<button href="#!" class="modal-action waves-effect waves-green btn-flat">Upload</button>
		</div>
	</form>
	<!-- upload form -->
