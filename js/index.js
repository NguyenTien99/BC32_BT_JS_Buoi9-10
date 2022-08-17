// function constructor
function Staff(account, name, email, password, date, salary, position, hour){
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hour = hour;
}

// Method
// hàm tính tổng lương
Staff.prototype.calcSalary = function(){
    switch(this.position){
        case "boss":{
            return this.salary * 3;
        }
        case "manager":{
            return this.salary * 2;
        }
        case "employee":{
            return this.salary;
        }
    }
}

// Hàm xếp loại nhân viên
Staff.prototype.sortStaff = function(){
    // let result = "";
    if(this.hour < 160){
        return  "Nhân viên trung bình";
    }else if (this.hour < 176){
        return "Nhân viên khá";
    }else if (this.hour < 192){
        return "Nhân viên giỏi";
    }else {
        return "Nhân viên xuất sắc";
    }
}

//=======Xử lí=========================================================
// Tạo array staffs để lưu trữ danh sách
let staffs = [];

// hàm thêm nhân viên
function addUser(){
    // B1: DOM
    let account = dom("#tknv").value;
    let name = dom("#name").value;
    let email = dom("#email").value;
    let password = dom("#password").value;
    let date = dom("#datepicker").value;
    let salary = +dom("#luongCB").value;
    let position = dom("#chucvu").value;
    let hour = +dom("#gioLam").value;

    // let isvalid = validateForm();
    // if(!isvalid){
    //     return;
    // }
    
    //B2: Tạo object chứa thông tin trên
    let staff = new Staff(account, name, email, password, date, salary, position, hour);
    //B3: Thêm object vào mảng staffs
    staffs.push(staff);

    //B4: hiển thị
    display(staffs);

    //Reset form
    resetForm();
}

// hàm xóa nhân viên
function detele(account){
    // console.log(account)
    //lọc phần tử bằng filter
    staffs = staffs.filter((staff) => {
        return staff.account !== account;
    })

    // Hiển thị lại kết quả sau khi xóa
    display(staffs);
}

// hàm tìm kiếm 
function searchStaff(){
    let searchStaff = dom("#searchName").value;
    searchStaff = searchStaff.toLowerCase();
    let newStaffs = staffs.filter((staff) => {
        let name = staff.sortStaff().toLowerCase();
        return name.includes(searchStaff);
    });

    display(newStaffs);
}

// hàm chỉnh sửa
function fillStaff(account){
    let staff = staffs.find((value) => {
        return value.account === account;
    });

    dom("#tknv").value = staff.account;
    dom("#name").value = staff.name;
    dom("#email").value = staff.email;
    dom("#password").value = staff.password;
    dom("#datepicker").value = staff.date;
    dom("#luongCB").value = staff.salary;
    dom("#chucvu").value = staff.position;
    dom("#gioLam").value = staff.hour;

    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
}
// hàm cập nhật
function updateStaff(){
    // B1 Dom lấy giá trị
    let account = dom("#tknv").value;
    let name = dom("#name").value;
    let email = dom("#email").value;
    let password = dom("#password").value;
    let date = dom("#datepicker").value;
    let salary = +dom("#luongCB").value;
    let position = dom("#chucvu").value;
    let hour = +dom("#gioLam").value;

    // B2 : Tạo mới Staff constructor
    staff = new Staff(account, name, email, password, date, salary, position, hour);

    // B3 : dựa vào account tìm kiếm object để update
    let index = staffs.findIndex((value) => {
        return staff.account === value.account;
    })
    staffs[index] = staff;

    display(staffs);
    resetForm();
}
//======= Hàm helper =================================================

// hàm hiên thị thông tin
function display(staffs){
    let html = staffs.reduce((result, staff) => {
        return result + `
            <tr>
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.date}</td>
                <td>${staff.position}</td>
                <td>${staff.calcSalary()}</td>
                <td>${staff.sortStaff()}</td>
                <td>
                    <button class="btn btn-success ml-2"
                    onclick="fillStaff('${staff.account}')"
                    data-toggle="modal"
                    data-target="#myModal"
                    >Edit</button>
                    <br/>
                    <button class="btn btn-danger mt-2 " 
                    onclick="detele('${staff.account}')"
                    >
                    Delete</button>
                </td>
            </tr>
        `
    }, "")

    dom("#tableDanhSach").innerHTML = html;
}

// hàm reset
function resetForm(){
    dom("#tknv").value = "";
    dom("#name").value = "";
    dom("#email").value = "";
    dom("#password").value = "";
    dom("#datepicker").value = "";
    dom("#luongCB").value = "";
    dom("#chucvu").value = "";
    dom("#gioLam").value = "";

    dom("#tbTKNV").classList.remove("d-block");
    dom("#tbTen").classList.remove("d-block");
    dom("#tbEmail").classList.remove("d-block");
    dom("#tbMatKhau").classList.remove("d-block");
    dom("#tbNgay").classList.remove("d-block");
    dom("#tbLuongCB").classList.remove("d-block");
    dom("#tbChucVu").classList.remove("d-block");
    dom("#tbGiolam").classList.remove("d-block");

    dom("#tbTKNV").innerHTML = "";
    dom("#tbTen").innerHTML = "";
    dom("#tbEmail").innerHTML = "";
    dom("#tbMatKhau").innerHTML = "";
    dom("#tbNgay").innerHTML = "";
    dom("#tbLuongCB").innerHTML = "";
    dom("#tbChucVu").innerHTML = "";
    dom("#tbGiolam").innerHTML = ""; 
    
    dom("#tknv").disabled = false;
    dom("#btnThemNV").disabled = false;
}
// hàm dom
function dom(selector){
    return  document.querySelector(selector);
}

// Validation
// hàm kiểm tra account
function validateAccount(){
    let account = dom("#tknv").value;
    let spanEl = dom("#tbTKNV")

    if(!account){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Tài khoản không được để trống";
        return false;
    }

    if(account.length < 5 || account.length > 8){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Tài khoản tối đa 4 đến 6 kí tự";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

//hàm kiểm tra tên nhân viên
function validateName(){
    let name = dom("#name").value;
    let spanEl = dom("#tbTen")

    if(!name){
        spanEl.classList.add("d-block")
        spanEl.innerHTML = "Họ và tên không được để trống";
        return false;
    }

    // let regex = /^[A-Za-z\s]*$/;
    let regex = /^[a-zA-Z'-'\sáàảãạăâắằấầặẵẫậéèẻ ẽẹêếềểễệóòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ ÊỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$/
    if(!regex.test(name)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Họ và tên phải là chữ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra Email
function validateEmail(){
    let email = dom("#email").value;
    let spanEl = dom("#tbEmail");

    if(!email){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Email không được để trống";
        return false;
    }

    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(email)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Email không đúng định dạng";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

//hàm kiểm tra mật khẩu
function validatePassword(){
    let password = dom("#password").value;
    let spanEl = dom("#tbMatKhau");
    
    if(!password){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu không được để trống";
        return false;
    }
    if(password.length < 6 || password.length > 10){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu từ 6 đến 10 kì tự";
        return false;
    }

    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}/;
    if(!regex.test(password)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra input date
function validateTime(){
    let time = dom("#datepicker").value;
    let spanEl = dom("#tbNgay")

    if(!time){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Ngày làm không được để trống";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra input lương
function validateSalary(){
    let salary = dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");

    if(!salary){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Lương cơ bản không được để trống";
        return false;
    }

    let regex = /^[\d]*$/;
    if(!regex.test(salary)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chỉ được điền số";
        return false;
    }

    if(salary < 1e6 || salary > 2e7){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Lương cơ bản từ 1,000,000 - 20,000,000";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra input chức vụ
function validatePosition(){
    let position = dom("#chucvu").value;
    let spanEl = dom("#tbChucVu");

    if(!position){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chọn chức vụ hợp lệ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra số giờ làm 
function validateHour(){
    let hour = dom("#gioLam").value;
    let spanEl = dom("#tbGiolam");

    if(!hour){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Số giờ trong tháng không được để trống";
        return false;
    }

    let regex = /^[\d]*$/;
    if(!regex.test(hour)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chỉ được điền số";
        return false;
    }

    if( hour < 80 || hour > 200){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Số giờ làm trong tháng 80-200 giờ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra tổng
function validateForm(){
    let isvalid = true;
    isvalid = validateAccount() & validateName() & validateEmail() & validatePassword() & validateTime() & validateSalary() & validatePosition() & validateHour();

    if(!isvalid){
        alert("Form không hợp lệ");
        return false;
    }

    return true;
}

