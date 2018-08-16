        <li class="breadcrumb-item active">물류배송신청</li>
      </ol>
    
      <!-- content-start -->
      <div class="card card-register mx-auto mt-5" style="max-width: 80rem">
        <div class="card-header">물류배송신청</div>
        <div class="card-body">
          <form method="post">
            <input type="hidden" name="action" value="contract">
            <div class="form-group">
              <label for="id">아이디</label>
              <input class="form-control" id="id" type="email" aria-describedby="emailHelp" readonly="readonly" value="<?php echo $this->param->member->id ?>">
            </div>
            <div class="form-group">
              <label for="name">회사명</label>
              <input class="form-control" id="name" type="email" aria-describedby="emailHelp" readonly="readonly" value="<?php echo $this->param->member->name ?>">
            </div>
            <div class="form-group">
              <label for="tel">전화번호</label>
              <input class="form-control" id="tel" type="email" aria-describedby="emailHelp" readonly="readonly" value="<?php echo $this->param->member->tel ?>">
            </div>
            <div class="form-group">
              <label for="weight">배송중량</label>
              <select name="weight" id="weight" class="form-control">
                <option value="">선택</option>
                <option value="1">1톤</option>
                <option value="4">4톤</option>
                <option value="8">8톤</option>
                <option value="15">15톤</option>
                <option value="24">24톤</option>
              </select>
            </div>
            <div class="form-group">
              <label for="location">배송지역</label>
              <select name="location" id="location" class="form-control">
                <option value="">선택</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="충북">충북</option>
                <option value="대전">대전</option>
                <option value="경남">경남</option>
                <option value="경북">경북</option>
                <option value="전남">전남</option>
                <option value="전북">전북</option>
                <option value="충남">충남</option>
              </select>
            </div>
            <div class="form-group">
              <label for="date">배송일</label>
              <input class="form-control" id="date" name="ariv_date" type="email" aria-describedby="emailHelp" placeholder="" readonly="readonly">
            </div>
            <button type="submit" class="btn btn-primary btn-block">배송신청</button>
          </form>
            <script type="text/javascript">
            $(function(){
              $('#date').datepicker({
                dateFormat : 'yy년 mm월 dd일',
                minDate : +1
              });
            });
            </script>

        </div>
      </div>
      <!-- content-end -->
