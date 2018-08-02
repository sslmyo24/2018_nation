<div class="tour-detail">
    <ul>
        <li class="row">
            <h4 class="modal-title"><?php echo $data->subject ?></h4>
        </li>
        <li class="row">
            <div class="img_wrap"><img src="<?php echo UPLOAD_URL ?>/<?php echo $data->thumbnail ?>" alt="odong2.jpg"></div>
        </li>
        <li class="row">
        <?php $tagArr = explode(" ",$data->tag);
            foreach ($tagArr as $tag) {?>
            <div class="chip"><?php echo $tag ?></div>
        <?php } ?>
        </li>
        <li class="row">
            <?php include_once(_DATA."/{$data->file}") ?>
        </li>
        <li class="row">
            <div class="right">
                <a href="#!" class="light-blue darken-1 waves-effect waves-green btn-small layer_close">닫기</a>
            </div>
        </li>
    </ul>
</div>