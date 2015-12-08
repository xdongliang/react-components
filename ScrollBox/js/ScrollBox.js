    var ScrollBox = React.createClass({
        propTypes: {
            speed: React.PropTypes.number.isRequired,
            direction:React.PropTypes.string.isRequired,
            autoScroll:React.PropTypes.bool.isRequired,
            data: React.PropTypes.array.isRequired
        },
        getDefaultProps : function () {
            return {
                speed : 1000,
                direction:"vertical",
                autoScroll:false
            };
        },

        render: function() {

            var clsName;
            if(this.props.direction === 'vertical'){
                clsName = "vScrollBox";
            }else{
                clsName = "hScrollBox";
            }

            return (   
                <div className={clsName} ref="scrollBox"
                    onMouseEnter={this.mouseEnterHandler}
                    onMouseLeave={this.mouseLeaveHandler}>
                    <ul>
                    {
                        this.props.data.map(function(item){
                            return <li key={item.id}><a href={item.url}>{item.title}</a></li>;
                        })
                    }
                    {
                        this.props.data.map(function(item){
                            return <li key={item.id}><a href={item.url}>{item.title}</a></li>;
                        })
                    }
                    </ul>
                </div>
            );
        },

        componentDidMount: function(){
            var scrollBox = this.refs.scrollBox;

            if(this.props.direction === 'horizontal'){
                var itemWidth = scrollBox.firstChild.firstChild.offsetWidth;
                scrollBox.firstChild.style.width = itemWidth * scrollBox.firstChild.childNodes.length + "px";
            }

            if(this.props.autoScroll){
                scrollBox.isFirst = false;
                this.startScroll();
            }else{
                scrollBox.isFirst = true;
            }
        },

        mouseEnterHandler:function(event){
            var scrollBox = this.refs.scrollBox;
            if(scrollBox.isFirst){
                scrollBox.isFirst = false;
                this.startScroll();
            }else{
                scrollBox.start = false;
                clearTimeout(scrollBox.timer);
            }
        },

        mouseLeaveHandler:function(event){
            this.startScroll();
        },

        startScroll: function(){
            var that = this,
                scrollBox = this.refs.scrollBox;
            var maxScrollSize, scrollItemSize, scrollDirection;
            if(this.props.direction === 'vertical'){
                maxScrollSize = scrollBox.firstChild.offsetHeight/2,
                scrollItemSize = scrollBox.firstChild.firstChild.offsetHeight;
                scrollDirection = "scrollTop";
            }else if(this.props.direction === 'horizontal'){
                maxScrollSize = scrollBox.firstChild.offsetWidth/2,
                scrollItemSize = scrollBox.firstChild.firstChild.offsetWidth;
                scrollDirection = "scrollLeft";
            }else{
                throw "direction property use invalid value : "+this.props.direction;
            }
            if(scrollBox.start)
                return;
            clearTimeout(scrollBox.timer);
            scrollBox.start = true;
            function _scroll(){

                scrollBox[scrollDirection]++;

                if(scrollBox[scrollDirection]%scrollItemSize === 0){
                    scrollBox.start = false;
                    scrollBox.timer = setTimeout(that.startScroll, that.props.speed);
                }

                if(scrollBox[scrollDirection] === maxScrollSize){
                    scrollBox[scrollDirection] = 0;
                }

                if(scrollBox.start){
                    requestAnimationFrame(_scroll);
                }
            }


            requestAnimationFrame(_scroll);
        }
    });
