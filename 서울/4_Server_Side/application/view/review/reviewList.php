        <!-- main content -->
        <section class="content-wrap container">
            <h2 class="content-title">관광지 리뷰</h2>
            <div class="row">
                <div class="right">
                    <a href="<?php echo HOME ?>/review/write" class="btn blue layerOpener">리뷰 작성</a>
                </div>
            </div>
            <div class="row">
        <?php foreach ($list as $data) { ?>
                <article class="card review">
                    <a href="<?php echo HOME ?>/review/view/<?php echo $data->idx ?>" class="mask layerOpener"></a>
                    <div class="img_wrap" style="background-image:url(<?php echo UPLOAD_URL ?>/<?php echo $data->file ?>)"></div>
                    <div class="info">
                        <h3 class="subject"><?php echo $data->subject ?></h3>
                        <p class="destination">관광지 : <?php echo $data->tour_name ?> </p>
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
                </article>
        <?php } ?>
            </div>
            <ul class="pagination center">
                <li class="waves-effect"><a href="<?php if($page == 0): echo '#'; else: echo HOME; ?>/review/reviewList/?page=<?php echo $page - 1; endif ?>"><i class="material-icons">chevron_left</i></a></li>
            <?php for ($i=1; $i <= $size ; $i++) { ?>
                <li class="waves-effect <?php if($page == $i) echo 'active'; ?>"><a href="<?php echo HOME ?>/review/reviewList/?page=<?php echo $i; ?>"><?php echo $i; ?></a></li>
            <?php } ?>
                <li class="waves-effect"><a href="<?php if($page == $size): echo '#'; else: echo HOME; ?>/review/reviewList/?page=<?php echo $page + 1; endif ?>"><i class="material-icons">chevron_right</i></a></li>
            </ul>
            <script type="text/javascript" src="<?php echo SRC_URL ?>/se2/js/HuskyEZCreator.js"></script>
        </section>
    </section>
