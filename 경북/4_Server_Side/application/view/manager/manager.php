        <li class="breadcrumb-item active">지입차량주POS</li>
      </ol>

      <script type="text/javascript">
       $(function(){
        $('#date').datepicker({
          dateFormat : 'yy년 mm월 dd일',
          minDate : +1
        });
      });
      </script>

      <!-- content-start -->
      <div class="card card-register mx-auto mt-5" style="max-width: 80rem">
        <div class="card-header">물류배송신청검색</div>
        <div class="card-body">
          <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <div class="input-group col-12">
              <input class="form-control" id="date" type="text" placeholder="배송일검색" readonly="readonly">
              <span class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="mx-auto mt-5" style="max-width: 80rem">
        <div class="card">
          <div class="card-header">물류배송신청목록</div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap text-center table-bordered" >
              <thead>
                <tr>
                  <th class="w-1">No.</th>
                  <th>배송일</th>
                  <th>배송정보</th>
                  <th>배송지역</th>
                  <th>총 배송중량</th>
                  <th>총 배송거리</th>
                  <th>배송경로</th>
                  <th>Order인수</th>
                </tr>
              </thead>
              <tbody>
          <?php $i = 1;
          foreach ($dateList as $date):
            $logisticList = "logisticList".$i;
            $total_weight = "weight".$i;
            $total_distance = "distance".$i;
            $total_path = "path".$i;
            ?>
                <tr>
                  <td class="w-1"><?php echo $i; ?></td>
                  <td><?php echo date("Y년 m월 d일",strtotime($date->ariv_date)); ?></td>
                  <td class="text-left" style="vertical-align:inherit;padding:0;">
            <?php foreach ($$logisticList as $logistic): ?>
                    <div style="width:100%;height:169px;border-bottom:1px solid #dee2e6;margin:0;padding:15px;">
                      <p class="m-0">배송번호 : <?php echo $logistic->uni_idx ?></p>
                      <p class="m-0">아이디 : <?php echo $logistic->id ?></p>
                      <p class="m-0">회사명 : <?php echo $logistic->name ?></p>
                      <p class="m-0">전화번호 : <?php echo $logistic->tel ?></p>
                      <p class="m-0">배송중량 : <?php echo $logistic->weight ?>톤</p>
                      <p class="m-0">신청일자 : <?php echo date("Y년 m월 d일",strtotime($logistic->apply_date)); ?></p>
                    </div>
            <?php endforeach; ?>
                  </td>
                  <td style="margin:0;padding:0;vertical-align:inherit;">
            <?php foreach ($$logisticList as $logistic): ?>
                    <div style="width:100%;border-bottom:1px solid #dee2e6;height:169px;margin:0;line-height:169px;"><?php echo $logistic->location ?></div>
            <?php endforeach; ?>
                  </td>
                  <td><?php echo $$total_weight; ?>톤</td>
                  <td><?php echo $$total_distance; ?>km</td>
                  <form method="post">
                    <input type="hidden" name="action" value="takeOver">
                    <input type="hidden" name="ariv_date" value="<?php echo $date->ariv_date ?>">
                    <input type="hidden" name="weight" value="<?php echo $$total_weight ?>">
                    <input type="hidden" name="distance" value="<?php echo $$total_distance ?>">
                    <td>
                    <?php
                      if(strpos($$total_path,"/")){
                        $path = explode("/",$$total_path);
                        for ($i=0; $i < count($path); $i++) {
                          echo '<label class="custom-control custom-radio custom-control-inline">';
                            echo '<input type="radio" class="custom-control-input" name="path" value="'.$path[$i].'">';
                            echo '<span class="custom-control-label">'.$path[$i].'</span>';
                          echo '</label>';
                        }
                      } else {?>
                          <label class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="path" value="<?php echo $$total_path ?>">
                            <span class="custom-control-label"><?php echo $$total_path ?></span>
                          </label>
                      <?php } ?>
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm">인수하기</button>
                    </td>
                  </form>
                </tr>
          <?php $i++;
          endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>


       <div class="mx-auto mt-5" style="max-width: 80rem">
        <div class="card">
          <div class="card-header">배송리스트</div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap text-center table-bordered" >
              <thead>
                <tr>
                  <th class="w-1">No.</th>
                  <th>배송일</th>
                  <th>배송정보</th>
                  <th>배송지역</th>
                  <th>총 배송중량</th>
                  <th>총 배송거리</th>
                  <th>배송경로</th>
                  <th>배송상태</th>
                </tr>
              </thead>
              <tbody>
          <?php $i = 1;
          foreach ($deliveryList as $delivery):
            $toLogisticList = "toLogisticList".$i;
            $pathArr = explode("-",$delivery->path);
            ?>
                <tr>
                  <td class="w-1"><?php echo $i; ?></td>
                  <td><?php echo date("Y년 m월 d일",strtotime($delivery->ariv_date)); ?></td>
                  <td class="text-left" style="vertical-align:inherit;padding:0;">
            <?php foreach ($$toLogisticList as $logistic): ?>
                    <div style="width:100%;height:169px;border-bottom:1px solid #dee2e6;margin:0;padding:15px;">
                      <p class="m-0">배송번호 : <?php echo $logistic->uni_idx ?></p>
                      <p class="m-0">아이디 : <?php echo $logistic->id ?></p>
                      <p class="m-0">회사명 : <?php echo $logistic->name ?></p>
                      <p class="m-0">전화번호 : <?php echo $logistic->tel ?></p>
                      <p class="m-0">배송중량 : <?php echo $logistic->weight ?>톤</p>
                      <p class="m-0">신청일자 : <?php echo date("Y년 m월 d일",strtotime($logistic->apply_date)); ?></p>
                    </div>
            <?php endforeach; ?>
                  </td>
                  <td style="margin:0;padding:0;vertical-align:inherit;">
            <?php foreach ($$toLogisticList as $logistic): ?>
                    <div style="width:100%;border-bottom:1px solid #dee2e6;height:169px;margin:0;line-height:169px;"><?php echo $logistic->location ?></div>
            <?php endforeach; ?>
                  </td>
                  <td><?php echo $delivery->weight ?>톤</td>
                  <td><?php echo $delivery->distance ?>km</td>
                  <td>
                    <div class="selectgroup selectgroup-pills">
                  <?php
                for ($j=0; $j < count($pathArr) ; $j++):
                    if($j !== 0):?>
                        <p class="m-0">▼</p>
                    <?php endif;
                    $data = $model->fetch("SELECT * FROM logistic where location = '{$pathArr[$j]}'");
                    if($data->state === 'completed'):?>
                        <label class="selectgroup-item m-0">
                            <input type="checkbox" name="location" class="selectgroup-input" checked="" disabled="">
                            <span class="selectgroup-button" style="position:relative;">
                              <p class="m-0"><?php echo $data->location ?></p>
                              배송완료
                            </span>
                        </label>
                    <?php else: ?>
                        <label class="selectgroup-item m-0">
                            <input type="checkbox" name="location" class="selectgroup-input">
                            <span class="selectgroup-button" onclick="location.replace('<?php echo HOME ?>/manager/stateChange/?idx=<?php echo $data->idx ?>')" style="position:relative;z-index:10;">
                              <p class="m-0"><?php echo $data->location ?></p>
                              배송완료
                            </span>
                        </label>
                <?php endif;
                endfor; ?>
                    </div>
                  </td>
              <?php if($delivery->state === 'waiting'): ?>
                  <td>
                    <button class="btn btn-primary btn-sm">배송대기</button>
                  </td>
              <?php elseif($delivery->state === 'shipping'): ?>
                  <td>
                    <button class="btn btn-primary btn-sm">배송중</button>
                  </td>
              <?php elseif($delivery->state === 'completed'): ?>
                  <td>
                    <button class="btn btn-primary btn-sm">배송완료</button>
                  </td>
              <?php endif; ?>
                </tr>
          <?php $i++;
          endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- content-end -->
