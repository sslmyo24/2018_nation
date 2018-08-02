        <!-- main content -->
        <section class="content-wrap container">
            <h2 class="content-title">여수시 관광지</h2>
            <!-- tourlist destination card list -->
    <?php foreach ($list as $data) {?>
            <article class="card tourlist">
                <a href="<?php echo HOME ?>/tour/view/<?php echo $data->idx ?>" class="mask layerOpener"></a>
                <div class="img_wrap" style="background-image:url(<?php echo UPLOAD_URL ?>/<?php echo $data->thumbnail ?>)"></div>
                <div class="info">
                    <h3 class="subject"><?php echo $data->subject ?></h3>
                    <div class="description">
                    <?php
                        $text = file_get_contents(_DATA."/{$data->file}");
                        echo textSizeDown($text);
                    ?>
                    </div>
                    <p class="tag">
                        <?php $tagArr = explode(" ",$data->tag);
                            foreach ($tagArr as $tag) {?>
                        <span>#<?php echo $tag ?></span>
                        <?php } ?>
                    </p>
                </div>
            </article>
    <?php } ?>
        </section>
    </section>
