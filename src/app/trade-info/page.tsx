

export default function TradingInfo() {
  return (
    <div 
    // title="P2P Trading Info"
    >
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground">Total Trades</h3>
            <div className="flex justify-between mt-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-pi"></div>
                <span>Buy</span>
              </div>
              <span>58</span>
            </div>
            <div className="flex justify-between mt-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-action"></div>
                <span>Sell</span>
              </div>
              <span>47</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-muted-foreground">Completion Rate</h3>
            <div className="flex justify-between mt-1">
              <span>Buy</span>
              <span className="text-pi">100%</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Sell</span>
              <span>0%</span>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">30 Days Trades</span>
              <span>1</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Average Time</span>
              <span>4 m</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">30 days average cancellation</span>
              <span>0 m</span>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Registered</span>
              <span>1269 Days</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">First Trade</span>
              <span>353 Days</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Traded With</span>
              <span>101</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Blacklist by</span>
              <span>0</span>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">30D Trading Volume</span>
              <span>118.28 USDT</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Total Trading Volume</span>
              <span>6,923.2 USDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
