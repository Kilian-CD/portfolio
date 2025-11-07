document.addEventListener("DOMContentLoaded", (event) => {
	const body = document.getElementsByTagName("body")[0];
	const menu = document.getElementById("menu");
	const menu_buttons = menu.getElementsByTagName("button");
	const header = document.getElementsByTagName("header")[0];
	const header_buttons = header.getElementsByTagName("button");
	const carrousel = document.getElementById("section-carrousel")

	open_menu = function(){
		menu.style.left = 0;
		document.body.style.overflowY = "hidden";
	}
	close_menu = function(){
		menu.style.left = "-100vw";
		document.body.style.overflowY = "auto";
	}
	select_section = function(page){
		header_buttons[selected_page].className = "";
		menu_buttons[selected_page].className = "";
		header_buttons[page].className = "active";
		menu_buttons[page].className = "active";
		selected_page = page;
		carrousel.style.transform = `translate(${page*-100}vw)`
		tempUrl = new URL(window.location.href);
		tempUrl.searchParams.set("page", selected_page)
		window.history.pushState({}, '', tempUrl.toString());
		close_menu();
	}

	copy_text = function(text, element_name){
		navigator.clipboard.writeText(text.innerHTML);
		show_popup(element_name);
	}

	show_popup = function(element_name){
		const popup = document.createElement("div");
		popup.className = "popup";
		popup.innerHTML = `${element_name} copié(e) dans votre presse-papier.`
		body.append(popup);
		popup.style.bottom = `-${popup.offsetHeight}px`;
		setTimeout(() => {
			popup.style.bottom = "150px";
		}, 50);
		setTimeout(() => {
			popup.style.bottom = `-${popup.offsetHeight}px`;
			setTimeout(() => {
				popup.remove();
			}, 250);
		}, 4000);
		
	}

	download_cv = function(){
		const link = document.createElement("a");
		link.href = "pdf/main.pdf";
		link.download = "CV_Kilian_COULON-DEPUCCIO.pdf";
		link.click();
	}

	let params = new URLSearchParams(document.location.search);
	let selected_page = params.get("page") ?? 0;
	if(selected_page != 0){
		select_section(selected_page)
	}
	header_buttons[selected_page].className = "active";
	menu_buttons[selected_page].className = "active";
	
});