  <script type="text/javascript">
    $(function(){
      qt();
    })
  </script>
            <div class="page-header">
              <!-- page title start-->
              <h1 class="page-title">
                피자스타 메뉴목록 
              </h1>
              <!-- page title end-->
            </div>

            <!-- contents start -->
            <div class="col-12">
              <div class="row">
                
                <div class="card" style="position: fixed; margin-left: 1180px; top: 210px; max-height: 600px; width: 350px; z-index: 900;">
                  <div class="card-header">
                    <h4 class="card-title" style="font-size: 1.2em; font-weight: bold;">주문함 (2개)</h4>
                  <div class="col text-right">
                    <a href="" class="btn btn-sm btn-outline-primary">비우기</a>
                  </div>
                
                  </div>
                  <div class="card-body1 o-auto p-3" style="height: 600px">
                    <ul class="list-unstyled list-separated">
                      <li class="list-separated-item">
                        <div class="row align-items-center">
                          <div class="col" style="word-break: break-all;">
                            <strong>고구마무스 피자</strong><br>
                            주문수량 : 2 개<br>
                            가 격 : 23,000원<br>
                            합 계 : (46,000원)
                          </div>
                          <div class="col-auto">
                            <a href="javascript:void(0)" class="icon"><i class="fe fe-x"></i></a>
                          </div>
                        </div>
                      </li>
                      <li class="list-separated-item">
                        <div class="row align-items-center">
                          <div class="col" style="word-break: break-all;">
                            <strong>쉬림프 피자</strong><br>
                            주문수량 : 1 개<br>
                            가 격 : 18,000원<br>
                            합 계 : (18,000원)
                          </div>
                          <div class="col-auto">
                            <a href="javascript:void(0)" class="icon"><i class="fe fe-x"></i></a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="text-right" style="border-top: #dfdfdf solid 1px">
                    <div style="color: blue; font-size: 1.3em" class="mt-2 mr-3">총 주문금액 : 64,000원</div>
                      <button type="button" class="btn btn-primary btn-space mt-3 mb-3 mr-3">결제하기</button>
                  </div>
                </div>

                <div class="col-12">
                <div class="mb-2 text-right">
                  <button type="submit" class="btn btn-primary" onclick="window.location='<?php echo HOME ?>/order/review'">리뷰보기<span class="badge badge-primary">25개</span></button>
                </div>
                <div class="card">
                  <div class="table-responsive">
                    <table class="table table-hover table-outline table-vcenter text-nowrap card-table">
                      <thead>
                        <tr class="text-center">
                          <th><strong>메뉴이름</strong></th>
                          <th><strong>가격</strong></th>
                          <th><strong>수량</strong></th>
                          <th><strong>합계</strong></th>
                          <th><strong>주문함담기</strong></th>
                        </tr>
                      </thead>
                      <tbody>
                <?php foreach($menuList as $data): ?>
                        <tr class="text-center">
                          <td>
                            <?php echo $data->name ?>
                          </td>
                          <td data-price="<?php echo $data->price ?>">
                            <?php echo number_format($data->price) ?>원
                          </td>
                          <td style="width: 10%">
                            <input type="number" class="form-control qt" placeholder="1" min="1" value="1">
                          </td>
                          <td style="width: 20%">
                            <input type="text" class="form-control text-right price" readonly="readonly" value="<?php echo $data->price ?>">
                          </td>
                          <td>
                            <button type="button" class="btn btn-secondary btn-space">주문함담기</button>
                          </td>
                        </tr>
                <?php endforeach ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              </div>
            </div>
            <!-- contents end -->
