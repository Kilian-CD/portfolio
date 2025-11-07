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
	}

	let params = new URLSearchParams(document.location.search);
	let selected_page = params.get("page") ?? 0;
	if(selected_page != 0){
		select(selected_page)
	}
	header_buttons[selected_page].className = "active";
	menu_buttons[selected_page].className = "active";
	
});