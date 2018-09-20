
function myEvaluateFunction() {
	var dragDropObject = dragdrop.getElementByType("custom")._custom;
	var droppedCount = 0;
	var correctlyDroppedCount = 0;
	var redherringDroppedCount = 0;
	console.log(dragDropObject._arDrags)
	for(var i=0;i<dragDropObject._arDrags.length;i++){
		var drag = dragDropObject._arDrags[i];
		console.log("drag item " + drag.elementId + "; dropped: " + drag.dropped + "; match: " + drag.match);
		if(drag.dropped){
			droppedCount++;
			if(drag.match === "-1") redherringDroppedCount++;
			if(drag.match === drag.dropped.id) correctlyDroppedCount++
			console.log(drag.container.innerHTML)
		}
	}

	console.log("droppedCount=" +droppedCount)
	console.log("correctlyDroppedCount=" +correctlyDroppedCount)
	console.log("redherringDroppedCount=" +redherringDroppedCount)
}