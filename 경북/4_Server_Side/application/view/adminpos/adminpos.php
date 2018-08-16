        </li>
        <li class="breadcrumb-item active">관리자POS</li>
      </ol>
    
      <!-- content-start -->
      
      <style type="text/css">
        .tableCu{ width: auto; text-align: center; }
        .tableCu td{ border: #dfdfdf solid 1px; width: 60px; height: 60px; }
        .tdYellow { background: yellow; border: 0 !important}
        .last { border-right: yellow solid 1px !important; }
        .tdBlue { background: blue; border: 0 !important; color: #fff}
        .tdRed { background: red; }
      </style>
      <table class="tableCu mx-auto">
        <tr>
          <td class="tdYellow">

          </td>
          <td class="tdBlue">
             서울
          </td>
          <td class="tdBlue">
             경기 
          </td>
          <td class="tdBlue">
             강원
          </td>
          <td class="tdBlue">
             충북
          </td>
          <td class="tdBlue">
             충남
          </td>
          <td class="tdBlue">
             대전
          </td>
          <td class="tdBlue">
             경남
          </td>
          <td class="tdBlue">
             경북
          </td>
          <td class="tdBlue">
             전남
          </td>
          <td class="tdBlue">
             전북
          </td>
          <td class="tdBlue">
             <strong>도착지</strong>
             <p class="m-0">▲</p>
          </td>
        </tr>
    <?php foreach ($list as $data): ?>
        <tr>
          <td class="tdYellow">
             <?php echo $data->기준 ?>
          </td>
          <td <?php if($data->서울 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->서울 ?>km
          </td>
          <td <?php if($data->경기 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->경기 ?>km
          </td>
          <td <?php if($data->강원 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->강원 ?>km
          </td>
          <td <?php if($data->충북 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->충북 ?>km
          </td>
          <td <?php if($data->충남 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->충남 ?>km
          </td>
          <td <?php if($data->대전 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->대전 ?>km
          </td>
          <td <?php if($data->경남 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->경남 ?>km
          </td>
          <td <?php if($data->경북 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->경북 ?>km
          </td>
          <td <?php if($data->전남 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->전남 ?>km
          </td>
          <td <?php if($data->전북 == "0"): ?> class="tdRed" <?php endif ?>>
             <?php echo $data->전북 ?>km
          </td>
          <td class="tdBlue">
            
          </td>
        </tr>
    <?php endforeach ?>
        <tr>
          <td class="tdYellow">
             <strong>출발지</strong>
             <p class="m-0">▶</p>
          </td>
          <td class="tdYellow">
              
          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow">

          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow">
            
          </td>
          <td class="tdYellow">
             
          </td>
          <td class="tdYellow last">
             
          </td>
          <td class="tdBlue">
            
          </td>
        </tr>


      </table>
      <!-- content-end -->
