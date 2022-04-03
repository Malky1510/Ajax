$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(({ id, firstName, lastName, age }) => {
                $("#people-table tbody").append(`
<tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${age}</td>
    <td>
        <button class='btn btn-primary edit-button' data-id='${id}' data-first-name='${firstName}' data-last-name='${lastName}' data-age='${age}'>Edit</button>
    </td>
    <td>
        <button class='btn btn-danger delete-button' data-person-id='${id}'>Delete</button>
    </td>
</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {

        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post('/people/addperson', { firstName, lastName, age }, function () {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });

    $('#people-table').on('click', '.edit-button', function () {

        const id = $(this).data('id');
        const firstName = $(this).data('first-name');
        const lastName = $(this).data('last-name');
        $('#first-name-modal').val(firstName);
        $('#last-name-modal').val(lastName);;
        $('#age-modal').val($(this).data('age'));
        $('#person-name').html(`${firstName} ${lastName}`);
        $('.modal').data('person-id', id);
        $('.modal').modal()

    });

    $('#save').on('click', function () {
        const firstName = $("#first-name-modal").val();
        const lastName = $("#last-name-modal").val();
        const age = $("#age-modal").val();
        const id = $('.modal').data('person-id');

        $.post('/people/updateperson', { id, firstName, lastName, age }, function () {
            $('.modal').modal('hide');
            loadPeople();
            $("#first-name-modal").val('');
            $("#last-name-modal").val('');
            $("#age-modal").val('');
        });
    });

    $('#people-table').on('click', '.delete-button', function () {

        const id = $(this).data('person-id');
        $.post('/people/deleteperson', { id }, function () {
            loadPeople();
        })
    })

});