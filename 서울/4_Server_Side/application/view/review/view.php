<div class="layer">
    <span class="middle"></span>
    <div class="layer_box">
        <a href="#" class="layer_close">X</a>
        <div class="review-detail">
            <ul>
                <li class="row">
                    <div class="review-title">
                        <h4 class="subject"><?php echo $data->subject ?></h4>
                        <p>
                            <span class="writer">
                                <i class="material-icons tiny">brush</i>
                                <?php echo $data->writer ?>
                            </span>
                            <span class="date">
                                <i class="material-icons tiny">access_time</i>
                                <?php echo $data->time ?>
                            </span>
                        </p>
                    </div>
                </li>
                <li class="row">
                    <div class="img_wrap"><img src="<?php echo UPLOAD_URL ?>/<?php echo $data->file ?>" alt="odong1.jpg"></div>
                </li>
                <li class="row">
                    <?php echo htmlspecialchars_decode($data->content) ?>
                </li>
                <li class="row">
                    <div class="center">
                        <a href="<?php echo HOME ?>/review/update/<?php echo $data->idx ?>" class="light-blue darken-3 waves-effect waves-light btn-small layerOpener">수정</a>
                        <a href="<?php echo HOME ?>/review/delete/<?php echo $data->idx ?>" class="light-blue darken-3 waves-effect waves-light btn-small">삭제</a>
                        <a href="#!" class="light-blue waves-effect waves-light btn-small layer_close">닫기</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>