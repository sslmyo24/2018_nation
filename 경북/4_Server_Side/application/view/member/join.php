        <li class="breadcrumb-item active">회원가입</li>
      </ol>
    
      <!-- content-start -->
      <div class="accordion col-8 ml-auto mr-auto" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                고객사 회원가입
              </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <!-- 고객사 회원가입 form -->
              <div class="col-6" style="margin: 0 auto">
                <form method="post">
                  <input type="hidden" name="action" value="join_company">
                  <div class="form-group">
                    <label for="id1">아이디</label>
                    <input class="form-control" id="id1" name="id" type="text" aria-describedby="nameHelp" placeholder="이메일형식">
                  </div>
                  <div class="form-group">
                    <label for="password1">비밀번호</label>
                    <input class="form-control" id="password1" name="pw" type="password" aria-describedby="nameHelp" placeholder="영문,숫자포함 8글자이상, 반복되는 문자가 4개 이상 연속되면 등록불가">
                  </div>
                  <div class="form-group">
                    <label for="name1">회사명</label>
                    <input class="form-control" id="name1" name="name" type="text" aria-describedby="emailHelp" placeholder="한글 또는 영문">
                  </div>
                  <div class="form-group">
                    <label for="tel1">전화번호</label>
                    <input class="form-control" id="tel1" name="tel" type="text" aria-describedby="emailHelp" placeholder="000[2-3자리]-0000[3-4자리]-0000[4자리]">
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">회원가입</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                지입차량주 회원가입
              </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
              <!-- 고객사 회원가입 form -->
              <div class="col-6" style="margin: 0 auto">
                <form method="post">
                  <input type="hidden" name="action" value="join_carOwner">
                  <div class="form-group">
                    <label for="id">아이디</label>
                    <input class="form-control" id="id" name="id" type="text" aria-describedby="nameHelp" placeholder="이메일형식">
                  </div>
                  <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input class="form-control" id="password" name="pw" type="password" aria-describedby="nameHelp" placeholder="영문,숫자포함 8글자이상, 반복되는 문자가 4개 이상 연속되면 등록불가">
                  </div>
                  <div class="form-group">
                    <label for="name">차량주명</label>
                    <input class="form-control" id="name" name="name" type="text" aria-describedby="emailHelp" placeholder="한글 또는 영문">
                  </div>
                  <div class="form-group">
                    <label for="tel">전화번호</label>
                    <input class="form-control" id="tel" name="tel" type="text" aria-describedby="emailHelp" placeholder="000[2-3자리]-0000[3-4자리]-0000[4자리]">
                  </div>
                  <div class="form-group">
                    <label for="weight">차량적재량</label>
                    <select name="weight" id="weight" class="form-control">
                      <option value="">선택</option>
                      <option value="1">1톤</option>
                      <option value="4">4톤</option>
                      <option value="8">8톤</option>
                      <option value="15">15톤</option>
                      <option value="24">24톤</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">회원가입</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-end -->
