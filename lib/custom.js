$(document).ready(function () {

    $('#myModal').modal('show');//displays modal on page load

    function build() {

        var startHTML = '<select id= "start">',
		endHTML = '<select id="end">',
		timeArray = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
        section = '',
        newRow = '<tr id="',//give id's to rows
        data = "<td class='timeStamp'>",
        data30 = "<td class='timeStamp alertnatingRows'>",
        minute30 = "<td class='alertnatingRows'>",
        timeStamp = "<td>";

        for (var i = 0; i < timeArray.length; i++) {

            var option = '<option>';

            if (timeArray[i] === 12 || timeArray[i] < 8) {
                var optionVal = '<option value="';
                startHTML += optionVal + timeArray[i] + 'PM">' + timeArray[i] + ': 00 PM' + '</option>' + optionVal + timeArray[i] + '30PM">' + timeArray[i] +
                ': 30 PM' + '</option>';
                endHTML += optionVal + timeArray[i] + 'PM">' + timeArray[i] + ': 00 PM' + '</option>' + optionVal + timeArray[i] + '30PM">' + timeArray[i] +
                  ': 30 PM' + '</option>';  //give value attributes

                //generate time values to select from



                section += newRow + timeArray[i] + 'PM' + '">';
                section += timeStamp + timeArray[i] + ': 00 PM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30PM' + '">';
                section += minute30 + timeArray[i] + ': 30 PM ' + '</td>' + data30 + '&nbsp;</td>' + data30 + '&nbsp;</td>';
                section += '</tr>';

                //generates PM times for table

            }
            else {
                var optionVal = '<option value="';
                startHTML += optionVal + timeArray[i] + 'AM">' + timeArray[i] + ': 00 AM' + '</option>' + optionVal + timeArray[i] + '30AM">' + timeArray[i] +
                             ': 30 AM' + '</option>';
                endHTML += optionVal + timeArray[i] + 'AM">' + timeArray[i] + ': 00 AM' + '</option>' + optionVal + timeArray[i] + '30AM">' + timeArray[i] +
                  ': 30 AM' + '</option>';
                //generate time values to select from


                section += newRow + timeArray[i] + 'AM' + '">';
                section += timeStamp + timeArray[i] + ': 00 AM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30AM' + '">';
                section += minute30 + timeArray[i] + ': 30 AM ' + '</td>' + data30 + '&nbsp;</td>' + data30 + '&nbsp;</td>';
                section += '</tr>';

                //generates AM times for table
            }
        }

        startHTML += '</select>';
        endHTML += '</select>';

        $('#startTimes').html(startHTML);
        $('#endTimes').html(endHTML);
        $('#tableBody').html(section);
        $('#tableBody tr').addClass('center');
    
    }; //generates table & options elements for 'select' html tag. assings values to start/end times

    build();//runs function, 'builds' page
    

    $('#submit').on('click', function () {

        var startTime = $("#start option:selected").text(),
            endTime = $("#end option:selected").text(),
            enterEventName = $('#eventName').val(),
            enterEventContactExt = $('#contact').val(),
            eventInfo = [startTime, enterEventName, enterEventContactExt],
            eventHtml = '<tr id="' + $('#start').val() + '">',
            data = '<td>',
            rowArray = $('#tableBody tr'),
            selectedOp = $("#start option:selected").id,
			endValue = $('#end option:selected').val(),
			arrayIndex = [],
			selectedIndex,
            isFirst = true,
            inUseArray = [],
            dateValue =  $('#alternate').val();
    
        $('#todaysDate').html(dateValue);

      
        for (var i = 0; i < rowArray.length; i++) {
          
            arrayIndex[i] = i;
            inUseArray[i] = 0;
        }



        for (var i = 0; i < rowArray.length; i++) {

 

            if (startTime === endTime) {

                alert('Error. Your event can not start and end at the same time.');

                break;
            }
            if (rowArray[i].id === $('#start').val()) {

                selectedIndex = i;

                for (var j = 0; j < eventInfo.length; j++) {

                    eventHtml += data + eventInfo[j] + '</td>';

                }

                eventHtml += '</tr>';

                $('#' + $('#start').val() + '').replaceWith(eventHtml);     

            }


            
            if (rowArray[i].id != endValue && i >= selectedIndex) {

                if (i === 0 && isFirst) {

                    isFirst = false;
                    $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('firstborder');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('firstborder');

                }

                if (isFirst) {
                    $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('topBorders');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('topBorders');
                    isFirst = false;
                }

                if ($('#' + rowArray[i].id + '').hasClass('alertnatingRows'));
                {
                    $('#' + rowArray[i].id + ' td:nth-child(2)').removeClass('alertnatingRows');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').removeClass('alertnatingRows');
                    if (i%2 == 1) {
                        $('#' + rowArray[i].id + '').addClass('alertnatingRows');
                    }

                }

                $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('selected timeStamp');
                $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('selected');
                $('#' + rowArray[i].id + ' td:nth-child(3)').removeClass('timeStamp');
                //$('.' + rowArray[i].id + ' td:nth-child(3)').addClass('selected timeStamp ');
            }

            
            

            if (rowArray[i].id === endValue) {
                $('#' + rowArray[i - 1].id + ' td:nth-child(2)').addClass('bottomBorder');
                $('#' + rowArray[i - 1].id + ' td:nth-child(3)').addClass('bottomBorder');
                break;
            }


        }

    });//adds events to form

});



function datePicker() {

    var date = document.getElementById('todaysDate');
    date.innerHTML = 'test';
}

$(function () {

    $('#datePicker').datepicker({

        altField: '#alternate',
        altFormat: 'DD, mm/dd/yy'

    });

});

function updateChange() {

    var date = document.getElementById('datePicker'),
        dateContent = document.getElementById('alternate').innerText;
    console.log('date: ', dateContent);
    date.innerHTML = dateContent.value;

};